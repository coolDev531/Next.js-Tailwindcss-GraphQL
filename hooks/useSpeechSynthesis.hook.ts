import { useCallback, useEffect, useRef, useState } from 'react';
import { getVoices, loadVoicesWhenAvailable } from '@/lib/speech';

interface SpeakParams {
  locale?: string;
  text: string;
  volume?: number;
}

interface UseSpeechSynthesisReturn {
  speechSynthesis: SpeechSynthesis | null;
  isSpeaking: boolean;
  speak: (args: SpeakParams) => void;
  cancelSpeak: () => void;
}

export default function useSpeechSynthesis(): UseSpeechSynthesisReturn {
  const speechSynthesis = useRef<SpeechSynthesis | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      loadVoicesWhenAvailable(() => {
        speechSynthesis.current = window.speechSynthesis;
      });
    }

    const handleCancel = () => {
      speechSynthesis.current?.cancel();
      window.speechSynthesis.cancel();
    };

    window.addEventListener('beforeunload', handleCancel);

    return () => {
      window.removeEventListener('beforeunload', handleCancel);
    };
  }, []);

  const speak = useCallback(
    ({ locale = 'en-US', text, volume = 1 }: SpeakParams) => {
      const voices = getVoices(locale);

      // TODO load preference here, e.g. male / female etc.
      // TODO but for now we just use the first occurrence
      const utterance = new window.SpeechSynthesisUtterance();
      utterance.voice = voices[0];
      utterance.pitch = 1;
      utterance.rate = 1;
      utterance.volume = volume;
      utterance.rate = 1;
      utterance.pitch = 0.8;
      utterance.text = text;
      utterance.lang = locale;

      utterance.onstart = () => {
        setIsSpeaking(true);
      };

      utterance.onend = () => {
        setIsSpeaking(false);
      };

      speechSynthesis.current?.cancel();
      speechSynthesis.current?.speak(utterance);
    },
    []
  );

  const cancelSpeak = useCallback(() => {
    setIsSpeaking(false);
    speechSynthesis.current?.cancel();
  }, []);

  return {
    speechSynthesis: speechSynthesis.current,
    isSpeaking,
    speak,
    cancelSpeak,
  };
}

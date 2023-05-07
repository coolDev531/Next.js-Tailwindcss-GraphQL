let _speechSynth: SpeechSynthesis;
let _voices: SpeechSynthesisVoice[];
const _cache: any = {};

/**
 * retries until there have been voices loaded. No stopper flag included in this example.
 * Note that this function assumes, that there are voices installed on the host system.
 */

function loadVoicesWhenAvailable(onComplete = () => {}) {
  _speechSynth = window.speechSynthesis;
  const voices = _speechSynth.getVoices();

  if (voices.length !== 0) {
    _voices = voices;
    onComplete();
  } else {
    return setTimeout(function () {
      loadVoicesWhenAvailable(onComplete);
    }, 100);
  }
}

/**
 * Returns the first found voice for a given language code.
 */

function getVoices(locale: string): SpeechSynthesisVoice[] {
  if (!_speechSynth) {
    throw new Error('Browser does not support speech synthesis');
  }
  if (_cache[locale]) return _cache[locale];

  _cache[locale] = _voices.filter(
    (voice: SpeechSynthesisVoice) => voice.lang === locale
  );
  return _cache[locale];
}

interface ISpeak {
  locale?: string;
  text: string;
  onEnd?: () => void;
  volume?: number;
  onStart?: () => void;
}

function speak({ locale = 'en-US', text, onEnd, volume = 1, onStart }: ISpeak) {
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

  if (onStart) {
    utterance.onstart = onStart;
  }

  if (onEnd) {
    utterance.onend = onEnd;
  }

  _speechSynth.cancel(); // cancel current speak, if any is running
  _speechSynth.speak(utterance);
}

function cancel() {
  _speechSynth.cancel();
}

function isSpeaking() {
  return _speechSynth?.speaking;
}

export { loadVoicesWhenAvailable, speak, cancel, isSpeaking };

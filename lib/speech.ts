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

export { loadVoicesWhenAvailable, getVoices };

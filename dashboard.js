function speakSummary(lang) {
  const voices = speechSynthesis.getVoices();
  const text = chartData[currentMetric]?.summary[lang];

  if (!text) {
    alert("Selected language summary not available.");
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = {
    en: 'en-IN',
    ta: 'ta-IN',
    hi: 'hi-IN',
    te: 'te-IN',
    kn: 'kn-IN'
  }[lang] || 'en-IN';

  // Use a voice that matches the language if available
  const voice = voices.find(v => v.lang === utterance.lang);
  if (voice) {
    utterance.voice = voice;
  }

  speechSynthesis.cancel();
  setTimeout(() => {
    speechSynthesis.speak(utterance);
  }, 100);
}

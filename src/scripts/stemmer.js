function stemmer(word) {
  const originalWord = word;
  while (word.length > 3) {
    if (allWords.includes(word)) {
      return word;
    }
    word = word.slice(0, -1);
  }
  return originalWord;
}

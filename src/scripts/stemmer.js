const vowels = ["a", "e", "ı", "i", "o", "ö", "u", "ü"];
const hardConsonants = ["p", "ç", "t", "k", "f", "s", "ş", "h"];
const lenitionLetters = ["c", "ğ", "b", "d"];

function stemmer(word) {
  const originalWord = word;
  while (word.length > 3) {
    if (allWords.includes(word)) {
      return word;
    }
    if (lenitionLetters.includes(word.slice(-1))) {
      const lastLetterChangedWord = handleLenition(word);
      if (allWords.includes(lastLetterChangedWord)) {
        return lastLetterChangedWord;
      }
    }
    word = word.slice(0, -1);
  }
  return originalWord;
}

function handleLenition(word) {
  const lastLetter = word.slice(-1);
  if (lastLetter == "c") {
    return word.substring(0, word.length - 1) + "ç";
  }
  if (lastLetter == "ğ") {
    return word.substring(0, word.length - 1) + "k";
  }
  if (lastLetter == "b") {
    return word.substring(0, word.length - 1) + "p";
  }
  if (lastLetter == "d") {
    return word.substring(0, word.length - 1) + "t";
  }
  return word;
}

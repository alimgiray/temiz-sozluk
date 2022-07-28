const vowels = ["a", "e", "ı", "i", "o", "ö", "u", "ü"];
const hardConsonants = ["p", "ç", "t", "k", "f", "s", "ş", "h"];
const lenitionLetters = ["c", "ğ", "b", "d"];
const pluralSuffixes = ["lar", "ler"];
const copulaSuffixes = ["dır", "dir", "dur", "dür", "tır", "tir", "tur", "tür"];
const nounMakingSuffixes = ["lık", "lik", "luk", "lük"];
const gerundSuffixes = ["mek", "mak"];

function stemmer(word) {
  const originalWord = word;
  while (word.length > 1) {
    if (allWords.includes(word)) {
      return word;
    }
    // handle lenition
    const lastLetter = word.slice(-1);
    if (lenitionLetters.includes(lastLetter)) {
      const lastLetterChangedWord = handleLenition(word, lastLetter);
      if (allWords.includes(lastLetterChangedWord)) {
        return lastLetterChangedWord;
      }
    }
    // mostly a shortcut
    const suffixRemovedWord = handleSuffixes(word);
    if (suffixRemovedWord) {
      return suffixRemovedWord;
    }
    for (let i = 0; i < gerundSuffixes.length; i++) {
      const suffix = gerundSuffixes[i];
      if (allWords.includes(word + suffix)) {
        return word;
      }
    }
    word = word.slice(0, -1);
  }
  return originalWord;
}

function handleLenition(word, lastLetter) {
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

function handleSuffixes(word) {
  const suffix = word.slice(-3);
  const wordWithoutSuffix = word.slice(0, -3);
  if (
    pluralSuffixes.includes(suffix) ||
    copulaSuffixes.includes(suffix) ||
    nounMakingSuffixes.includes(suffix)
  ) {
    if (allWords.includes(wordWithoutSuffix)) {
      return wordWithoutSuffix;
    }
  }
  return null;
}

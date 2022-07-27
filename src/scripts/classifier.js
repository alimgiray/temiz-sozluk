class Classifier {
  constructor() {
    this.dict = {};
    this.categories = {};
    this.wordList = [];
    this.categoryList = [];
    this.entryCount = 0;
    let self = this;
    // chrome.storage.local.clear();
    chrome.storage.local.get(["model"], function (result) {
      if (result) {
        const model = result.model;
        if (model) {
          self.dict = model.dict;
          self.categories = model.categories;
          self.wordList = model.wordList;
          self.categoryList = model.categoryList;
          self.entryCount = model.entryCount;
        }
      }
    });
  }
  static validate(token) {
    return /\w+/.test(token) && token.length > 3 && !stopWords.includes(token);
  }
  increment(token, category) {
    this.categories[category].tokenCount += 1;
    let word = this.dict[token];
    if (word === undefined) {
      this.dict[token] = {
        word: token,
        [category]: {
          count: 1,
        },
      };
      this.wordList.push(token);
    } else if (word[category] === undefined) {
      word[category] = {
        count: 1,
      };
    } else {
      word[category].count += 1;
    }
  }
  addDocument(entry, category) {
    if (this.categories[category] === undefined) {
      this.categories[category] = { docCount: 1, tokenCount: 0 };
      this.categoryList.push(category);
    } else {
      this.categories[category].docCount += 1;
    }
    let tokens = entry.split(/\s+/);
    tokens.forEach((token) => {
      token = token.toLowerCase();
      if (Classifier.validate(token)) {
        this.increment(token, category);
      }
    });
    this.train();
  }
  train() {
    this.wordList.forEach((key) => {
      let word = this.dict[key];
      this.categoryList.forEach((category) => {
        if (word[category] === undefined) {
          word[category] = {
            count: 0,
          };
        }
        let wordCat = word[category];
        let cat = this.categories[category];
        let freq = wordCat.count / cat.docCount;
        wordCat.freq = freq;
      });
    });
    this.wordList.forEach((key) => {
      let word = this.dict[key];
      this.categoryList.forEach((category) => {
        let sum = this.categoryList.reduce((p, cat) => {
          let freq = word[cat].freq;
          if (freq) {
            return p + freq;
          }
          return p;
        }, 0);
        let wordCat = word[category];
        let prob = wordCat.freq / sum;
        wordCat.prob = Math.max(0.01, Math.min(0.99, prob));
      });
    });
    this.entryCount++;
    console.log(`Evaluated ${this.entryCount} entries`);
    chrome.storage.local.set({ model: this }, function () {});
  }
  guess(data) {
    let tokens = data.split(/\s+/);
    let words = [];
    tokens.forEach((token) => {
      token = token.toLowerCase();
      if (Classifier.validate(token)) {
        if (this.dict[token] !== undefined) {
          let word = this.dict[token];
          words.push(word);
        }
      }
    });
    let sum = 0;
    let products = this.categoryList.reduce((product, category) => {
      product[category] = words.reduce((prob, word) => {
        return prob * word[category].prob;
      }, 1);
      sum += product[category];
      return product;
    }, {});
    let results = {};
    this.categoryList.forEach((category) => {
      results[category] = {
        probability: products[category] / sum,
      };
    });
    return results;
  }
}

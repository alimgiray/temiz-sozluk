# temiz-sozluk

A Chrome extension to personalize [ekşi sözlük](https://eksisozluk.com) content.

It's actually a simple naive bayes classifier, which trains itself as users cast votes on the website (like / dislike).

After some training it starts displaying it's prediction of whether user will like the entry or not, right below the entry itself.

It stores model data in browser's local storage.

Currently in test an in active development but if you want to try it out:

- Clone the repository
- Open chrome extensions by visiting `chrome://extensions`
- Enable developer mode
- Click `load unpacked` and choose the project folder

It also has an experimental Turkish stemmer written in JS. Check `/src/scripts/stemmer.js` if you are interested.

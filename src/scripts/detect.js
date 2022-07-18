const classifier = new Classifier();

window.addEventListener("load", (event) => {
  setupEventListeners();
});

function setupEventListeners() {
  const likeButtons = document.getElementsByClassName("like");
  const dislikeButtons = document.getElementsByClassName("dislike");
  Array.from(likeButtons).forEach((b) =>
    b.addEventListener("click", processLike)
  );
  Array.from(dislikeButtons).forEach((b) =>
    b.addEventListener("click", processDislike)
  );
}

function processLike(e) {
  const entry = getEntry(e);
  classifier.addDocument(entry, true);
  console.log(classifier);
}

function processDislike(e) {
  const entry = getEntry(e);
  classifier.addDocument(entry, false);
}

function getEntry(e) {
  const entryElement = e.path.find(
    (element) => element?.tagName?.toLowerCase() == "li"
  );
  const entryContents = entryElement.getElementsByClassName("content");
  if (entryContents.length > 0) {
    const entryDiv = entryContents[0];
    return strip(entryDiv.innerText)
      .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, " ")
      .replace(/\s{2,}/g, " ")
      .replace(/[^a-zA-ZşŞöÖçÇğĞıIiİüÜ ]/g, "");
  }
  return null;
}

const strip = (text) => {
  return new DOMParser()?.parseFromString(text, "text/html")?.body?.textContent;
};

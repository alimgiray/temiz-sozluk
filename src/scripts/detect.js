const classifier = new Classifier();

window.addEventListener("load", (event) => {
  setupEventListeners();
});

function setupEventListeners() {
  const likeButtons = document.getElementsByClassName("like");
  const dislikeButtons = document.getElementsByClassName("dislike");
  Array.from(likeButtons).forEach((b) => {
    b.addEventListener("click", processLike);
  });
  Array.from(dislikeButtons).forEach((b) =>
    b.addEventListener("click", processDislike)
  );
  classifyPage();
}

function classifyPage() {
  const entries = document.getElementsByClassName("content");
  Array.from(entries).forEach((e) => {
    classify(e);
  });
}

function processLike(e) {
  const { entry, entryDiv } = getEntry(e);
  classifier.addDocument(entry, true);
  classify(entryDiv);
}

function processDislike(e) {
  const { entry, entryDiv } = getEntry(e);
  classifier.addDocument(entry, false);
  classify(entryDiv);
}

function getEntry(e) {
  const entryElement = e.path.find(
    (element) => element?.tagName?.toLowerCase() == "li"
  );
  const entryDivs = entryElement.getElementsByClassName("content");
  if (entryDivs.length > 0) {
    const entryDiv = entryDivs[0];
    return { entry: sanitize(entryDiv), entryDiv };
  }
  return null, null;
}

function classify(entryDiv) {
  const feedbackContainer = getFeedbackContainer(entryDiv);
  if (!feedbackContainer) {
    return;
  }

  const entry = sanitize(entryDiv);
  const result = classifier.guess(entry);
  for (const key in result) {
    const probability = document.createElement("span");
    if (key === "true") {
      probability.setAttribute("id", "predict-like");
      probability.innerHTML = `like: %${Math.round(
        result[key].probability * 100
      )} `;
      feedbackContainer.querySelector("#predict-like")?.remove();
    } else {
      probability.setAttribute("id", "predict-dislike");
      probability.innerHTML = `dislike: %${Math.round(
        result[key].probability * 100
      )} `;
      feedbackContainer.querySelector("#predict-dislike")?.remove();
    }
    feedbackContainer.appendChild(probability);
  }
}

function getFeedbackContainer(entryDiv) {
  const parent = entryDiv.parentNode;
  const footers = parent.getElementsByTagName("footer");
  if (!footers || footers.length == 0) {
    return;
  }
  const footer = footers[0];
  const containers = Array.from(
    footer.getElementsByClassName("feedback-container")
  );
  if (!containers || containers.length == 0) {
    return null;
  }
  return containers[0];
}

function sanitize(entryDiv) {
  return strip(entryDiv.innerText)
    .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, " ")
    .replace(/\s{2,}/g, " ")
    .replace(/[^a-zA-ZşŞöÖçÇğĞıIiİüÜ ]/g, "");
}

const strip = (text) => {
  return new DOMParser()?.parseFromString(text, "text/html")?.body?.textContent;
};

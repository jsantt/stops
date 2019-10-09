/**
 * Convert string into HTML DOM nodes
 */
function stringToHtml(str) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(str, "text/html");
  return doc.body.firstChild;
}

/**
 * Updates given htmlContent in given place
 * @param {String} selector - querySelector
 * @param {String} htmlContent
 */
function updateDom(selector, htmlContent) {
  const element = document.querySelector(selector);
  console.dir(element);
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
  element.appendChild(htmlContent);
}

export { stringToHtml, updateDom };

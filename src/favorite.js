import { stringToHtml } from "./domHelper.js";

function favorite(stopId) {}

function createHTML(stopId) {
  return stringToHtml(
    `<div data-value="${stopId}">
        <a href="#">&#128943;</a>
    </div>`
  );
}

export { favorite };

import { stringToHtml, updateDom } from "./domHelper.js";

function initNavigation(querySelector, stopData) {
  const navigationHtml = createHtml();
  updateDom(querySelector, navigationHtml);
}

function createHtml() {
  const html = stringToHtml(
    `<div><div>📍<br>Lähimmät pysäkit</div><div>⭐<br>suosikit</div></div>`
  );
  return html;
}

export { initNavigation };

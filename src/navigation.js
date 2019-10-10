import { stringToHtml, updateDom } from "./domHelper.js";

const NAVIGATION_EVENT = "navigation.clicked";

function initNavigation(querySelector) {
  const navigationHtml = createHtml();
  updateDom(querySelector, navigationHtml);

  setNavigationListener(
    "[data-hook=favorites]",
    "[data-hook=nearest-stops]",
    true
  );
  setNavigationListener(
    "[data-hook=nearest-stops]",
    "[data-hook=favorites]",
    false
  );
}

function setNavigationListener(selector, removedSelector, selectFavorite) {
  document.querySelector(selector).addEventListener("click", () => {
    document.querySelector(selector).setAttribute("selected", true);
    document.querySelector(removedSelector).setAttribute("selected", false);

    localStorage.setItem("favorites", selectFavorite);

    const event = new CustomEvent(NAVIGATION_EVENT, {
      favorite: selectFavorite
    });
    window.dispatchEvent(event);
  });
}

function createHtml() {
  const html = stringToHtml(
    `
    <div>
        <div selected="true" data-hook="nearest-stops">📍<br>Lähimmät pysäkit</div>
        <div data-hook="favorites">⭐<br>suosikit</div>
    </div>`
  );
  return html;
}

export { NAVIGATION_EVENT, initNavigation };

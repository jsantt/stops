import { initSchedule } from "./schedule.js";
import { geolocate } from "./geolocate.js";
import { fetchSchedule } from "./data.js";
import { NAVIGATION_EVENT, initNavigation } from "./navigation.js";

function load() {
  localStorage.setItem(
    "favorite-stops",
    JSON.stringify(["HSL:2434204", "HSL:2432231", "HSL:2434231"])
  );

  initNavigation("[data-hook=navigation]");
  fetchAndShowSchedule();

  window.addEventListener(NAVIGATION_EVENT, () => {
    fetchAndShowSchedule();
  });
}

async function fetchAndShowSchedule() {
  const coordinates = await geolocate();
  const schedule = await fetchSchedule(
    coordinates.lat,
    coordinates.lon,
    favorites()
  );

  initSchedule("[data-hook=main]", schedule);
}

function favorites() {
  const favorites = localStorage.getItem("favorites");
  if (favorites !== "true") {
    return undefined;
  }

  return localStorage.getItem("favorite-stops");
}

export { load };

import { initMain } from "./main.js";
import { geolocate } from "./geolocate.js";
import { fetchSchedule } from "./data.js";
import { initNavigation } from "./navigation.js";

async function load() {
  const coordinates = await geolocate();
  const schedule = await fetchSchedule(coordinates.lat, coordinates.lon);

  initMain("[data-hook=main]", schedule);
  initNavigation("[data-hook=navigation]");
}

export { load };

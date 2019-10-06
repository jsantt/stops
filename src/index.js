import { createScheduleHtml } from "./createScheduleHtml.js";
import { geolocate } from "./geolocate.js";
import { fetchSchedule } from "./data.js";

async function load() {
  const coordinates = await geolocate();
  const schedule = await fetchSchedule(coordinates.lat, coordinates.lon);
  const scheduleHtml = createScheduleHtml(schedule);
  updateDom(scheduleHtml);
}

function updateDom(htmlContent) {
  const element = document.querySelector("[data-hook=main]");
  // element.parentElement.removeChild(element);
  element.appendChild(htmlContent);
}

export { load };

import { fetchSchedule } from "./data.js";
import { createScheduleHtml } from "./createScheduleHtml.js";

async function load() {
  const coordinates = { lat: "60.16172", lon: "24.65164" }; //getCoordinates();
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

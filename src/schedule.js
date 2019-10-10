import { stringToHtml, updateDom } from "./domHelper.js";

function initSchedule(querySelector, stopData) {
  const scheduleHtml = createHtml(stopData);
  updateDom(querySelector, scheduleHtml);
  setupRealtimeSwitch();
}

function createHtml(stopData) {
  const stops = stopData.data.nearest.edges;
  const timeNow = new Date();
  let mainFragment = document.createDocumentFragment();
  let stopFragment;

  stops.map(stop => {
    const stopHtml = stringToHtml(
      `<section>
            <header>
                <h2>${stop.node.place.name}<span class="secondary"> ${stop.node.place.desc}</span></h2>
                <div>${stop.node.distance}m</div>
                <div>&#128943;</div> 
            </header>
            <article class="secondary">
                <div></div>    
                <div>Min</div>
                <div></div>
                <div></div> 
            </article>
            
        </section>`
    );
    stopFragment = document.createDocumentFragment();
    stopFragment.append(stopHtml);

    stop.node.place.stoptimesWithoutPatterns.map(time => {
      const timeNodes = stringToHtml(
        `<article>
            <div class="${time.realtime === true ? "realtime-sign" : ""}">
            </div>
            <div>
            <span hidden data-hook="time-schedule">${timeToString(
              toHourAndMinutes(time.scheduledDeparture)
            )}</span>
            <span data-hook="time-realtime">
                ${toRealtime(
                  timeNow,
                  time.scheduledDeparture,
                  time.departureDelay,
                  time.realtime
                )}
            </span>
            </div>
            <div>${time.trip.routeShortName}</div>
            <div>${time.headsign}</div>
            <div>&#128943;</div>
        </article>`
      );
      stopFragment.querySelector("section").appendChild(timeNodes);
    });
    mainFragment.appendChild(stopFragment);
  });

  return mainFragment;
}

function toHourAndMinutes(seconds) {
  const hours = Math.floor(seconds / (60 * 60));
  const hoursInSeconds = hours * 60 * 60;
  const minutes = Math.floor((seconds - hoursInSeconds) / 60);

  return { hours: hours, minutes: minutes };
}

function timeToString(time) {
  const hours = time.hours > 9 ? `${time.hours}` : `0${time.hours}`;
  const minutes = time.minutes > 9 ? `${time.minutes}` : `0${time.minutes}`;

  return `${hours}.${minutes}`;
}

function toRealtime(timeNow, departure, delay, realtime) {
  const secondsNow = getSecondsSinceMidnight(timeNow);

  const scheduledDeparture = Math.floor((departure - secondsNow) / 60);

  if (departure < 30 || departure - delay < 30) {
    return `&#126;0`;
  }

  if (Math.abs(delay) < 30) {
    return `${scheduledDeparture}`;
  }

  if (delay > 0) {
    return `${scheduledDeparture}-${scheduledDeparture +
      Math.ceil(delay / 60)}`;
  }
  const rounded = Math.floor((departure - delay) / 60);

  return `${rounded}`;
}

function getSecondsSinceMidnight(time) {
  let timeCopy = new Date(time);
  const milliseconds = time - timeCopy.setHours(0, 0, 0, 0);
  return Math.round(milliseconds / 1000);
}

function setupRealtimeSwitch() {
  const toggle = document.querySelector("[data-hook=realtime]");

  toggle.addEventListener("click", () => {
    if (toggle.checked) {
      setAttribute("[data-hook=time-schedule]", "hidden", true);
      removeAttribute("[data-hook=time-realtime]", "hidden");
    } else {
      removeAttribute("[data-hook=time-schedule]", "hidden");
      setAttribute("[data-hook=time-realtime]", "hidden", true);
    }
  });
}

function setAttribute(selector, attribute, value) {
  const elementArray = document.querySelectorAll(selector);

  for (const elem of elementArray) {
    elem.setAttribute(attribute, value);
  }
}

function removeAttribute(selector, attribute) {
  const elementArray = document.querySelectorAll(selector);

  for (const elem of elementArray) {
    elem.removeAttribute(attribute);
  }
}

export { initSchedule };

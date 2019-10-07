import { stringToHtml, updateDom } from "./domHelper.js";

function initMain(querySelector, stopData) {
  const scheduleHtml = createHtml(stopData);
  updateDom(querySelector, scheduleHtml);
}

function createHtml(stopData) {
  const stops = stopData.data.nearest.edges;

  let mainFragment = document.createDocumentFragment();
  let stopFragment;

  stops.map(stop => {
    const stopHtml = stringToHtml(
      `<section>
            <header>
                <h2>${stop.node.place.name}<span class="secondary"> ${stop.node.place.desc}</span></h2>
                <div>${stop.node.distance}m</div>
                <div>&#11088;</div> 
            </header>
            
        </section>`
    );
    stopFragment = document.createDocumentFragment();
    stopFragment.append(stopHtml);

    stop.node.place.stoptimesWithoutPatterns.map(time => {
      const timeNodes = stringToHtml(
        `<article>
            <div>${timeToString(
              toHourAndMinutes(time.scheduledDeparture)
            )}<span class="secondary"> 
                ${delayToString(time.departureDelay, time.realtime)}
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

function delayToString(seconds, realtime) {
  if (realtime === false) {
    return "?";
  }

  if (seconds === 0) {
    return "&#10003;";
  }

  if (seconds < 30) {
    return seconds > 0 ? `+${seconds}s` : `${seconds}s`;
  }

  const rounded = Math.round(seconds / 60);

  return rounded > 0 ? `+${rounded}min` : `${rounded}min`;
}

export { initMain };

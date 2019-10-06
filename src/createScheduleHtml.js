function createScheduleHtml(stopData) {
  const stops = stopData.data.nearest.edges;

  let mainFragment = document.createDocumentFragment();
  let stopFragment;

  stops.map(stop => {
    const stopHtml = stringToHtml(
      `<section>
            <h2>${stop.node.distance}m ${stop.node.place.name} (${stop.node.place.desc})</h2>
        </section>`
    );
    stopFragment = document.createDocumentFragment();
    stopFragment.append(stopHtml);

    stop.node.place.stoptimesWithoutPatterns.map(time => {
      const timeNodes = stringToHtml(
        `<article>
            <div>${timeToString(toHourAndMinutes(time.scheduledArrival))}</div>
            <div>${time.trip.routeShortName}</div>
            <div>${time.headsign}</div>
        </article>`
      );
      stopFragment.querySelector("section").appendChild(timeNodes);
    });
    mainFragment.appendChild(stopFragment);
  });

  return mainFragment;
}

/**
 * Convert string into HTML DOM nodes
 */
function stringToHtml(str) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(str, "text/html");
  return doc.body.firstChild;
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

export { createScheduleHtml };

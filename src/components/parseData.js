import Vue from "vue";

/**
 * Parse line numbers (route short name) from given data
 * @param {Array} data
 * @returns {Array} of nearby line numbers
 */
function parseLines(data) {
  let lines = [];

  data.forEach(item => {
    item.stoptimesWithoutPatterns.forEach(departure => {
      if (!lines.includes(departure.trip.routeShortName)) {
        lines.push(departure.trip.routeShortName);
      }
    });
  });

  return lines;
}

function filterData(data, lineNumber) {
  const copy = [...data];

  if (lineNumber === undefined) {
    return copy;
  }
  const lineLowerCase = lineNumber.toLowerCase();
  let departuresVisible;

  copy.forEach(item => {
    departuresVisible = false;

    if (item.stoptimesWithoutPatterns !== undefined) {
      item.stoptimesWithoutPatterns.forEach(departure => {
        const routeLowerCase = departure.trip.routeShortName.toLowerCase();
        if (routeLowerCase.includes(lineLowerCase)) {
          // use Vue.set to let Vue know the change and re-render departures
          Vue.set(departure, "hidden", false);
          departuresVisible = true;
        } else {
          Vue.set(departure, "hidden", true);
        }
      });

      Vue.set(item, "hidden", !departuresVisible);
    }
  });
  return copy;
}

/**
 * data: [{stoptimesWithoutPatterns: [{headsign: 'Kivenlahti', trip: {routeShortName: '147'}}]}]
 */
function markFavoriteLines(data, favoriteLines) {
  if (data === undefined || favoriteLines === undefined) {
    return;
  }

  data.forEach(item => {
    if (item.stoptimesWithoutPatterns !== undefined) {
      item.stoptimesWithoutPatterns.forEach(departure => {
        if (favoriteLines.includes(departure.trip.routeShortName)) {
          // use Vue.set to let Vue know the change and re-render departures
          Vue.set(departure, "favorite", true);
        } else {
          Vue.set(departure, "favorite", false);
        }
      });
    }
  });
}

export { filterData, markFavoriteLines, parseLines };

import Vue from "vue";
import { filter } from "minimatch";

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

  return lines.sort();
}

/**
 * Parse line destinations (headsign) from given data
 * @param {Array} data
 * @returns {Array} of nearby line numbers
 */
function parseDestinations(data) {
  let destinations = [];

  data.forEach(item => {
    item.stoptimesWithoutPatterns.forEach(departure => {
      if (!destinations.includes(departure.headsign)) {
        destinations.push(departure.headsign);
      }
    });
  });

  return destinations.sort();
}

function filterData(data, filterText) {
  const copy = [...data];

  let departuresVisible;

  copy.forEach(item => {
    departuresVisible = false;

    if (item.stoptimesWithoutPatterns !== undefined) {
      item.stoptimesWithoutPatterns.forEach(departure => {
        if (
          filterText === undefined ||
          filterText === departure.trip.routeShortName ||
          filterText === departure.headsign
        ) {
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

export { filterData, markFavoriteLines, parseDestinations, parseLines };

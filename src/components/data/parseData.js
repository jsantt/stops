import Vue from "vue";

const sortByRouteShortName = (previous, current) => {
  return previous.routeShortName < current.routeShortName ? -1 : 1;
};

const sortByHeadsign = (previous, current) => {
  return previous.headsign < current.headsign ? -1 : 1;
};

/**
 * Parse line numbers (route short name) from given data
 * @param {Array} data
 * @returns {Array} of nearby line numbers
 */
function parseLines(data) {
  let lines = [];

  data.forEach(item => {
    item.stoptimesWithoutPatterns.forEach(departure => {
      if (
        !lines.some(line => {
          return line.routeShortName === departure.trip.routeShortName;
        })
      ) {
        lines.push({
          routeShortName: departure.trip.routeShortName,
          lat: item.lat,
          lon: item.lon,
          mode: departure.trip.route.mode
        });
      }
    });
  });

  return lines.sort(sortByRouteShortName);
}

/**
 * Parse line direction (headsign) from given data
 * @param {Array} data
 * @returns {Array} of nearby line numbers
 */
function parseDirections(data) {
  let directions = [];

  data.forEach(item => {
    item.stoptimesWithoutPatterns.forEach(departure => {
      if (
        !directions.some(direction => {
          return (
            departure.headsign === direction.headsign &&
            departure.trip.routeShortName === direction.routeShortName
          );
        })
      ) {
        directions.push({
          headsign: departure.headsign,
          routeShortName: departure.trip.routeShortName,
          lat: item.lat,
          lon: item.lon
        });
      }
    });
  });

  return directions.sort(sortByHeadsign);
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

export { markFavoriteLines, parseDirections, parseLines };

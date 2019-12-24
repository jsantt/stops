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
      if (
        !lines.some(line => {
          return line.routeShortName === departure.trip.routeShortName;
        })
      ) {
        lines.push({
          routeShortName: departure.trip.routeShortName,
          lat: item.lat,
          lon: item.lon
        });
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
function parseDestinations(data, routeShortName) {
  let destinations = [];

  data.forEach(item => {
    item.stoptimesWithoutPatterns.forEach(departure => {
      if (
        !destinations.some(destination => {
          return departure.headsign === destination.headsign;
        })
      ) {
        if (
          routeShortName === undefined ||
          routeShortName === departure.trip.routeShortName
        ) {
          destinations.push({
            headsign: departure.headsign,
            routeShortName: departure.trip.routeShortName
          });
        }
      }
    });
  });

  return destinations.sort();
}
// TODO: vaihda String --> Array, filterText is array
function filterData(data, allFilters) {
  const noFilters =
    allFilters === undefined ||
    !allFilters.some(filter => {
      return filter.active === true;
    });

  const copy = [...data];

  let departuresVisible;

  copy.forEach(item => {
    departuresVisible = false;

    if (item.stoptimesWithoutPatterns !== undefined) {
      item.stoptimesWithoutPatterns.forEach(departure => {
        if (
          noFilters ||
          allFilters.some(filter => {
            return (
              filter.routeShortName === departure.trip.routeShortName &&
              filter.headsign === departure.headsign &&
              filter.active === true
            );
          })
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

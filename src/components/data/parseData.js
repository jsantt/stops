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
          routeShortName: departure.trip.routeShortName
        });
      }
    });
  });

  return directions.sort(sortByHeadsign);
}

// TODO: vaihda String --> Array, filterText is array
/**
 *
 * @param {Array} data
 * @param {Array} allFilters -
 * item example:
 * {
 *  headsign: "Jorvi via Espoon keskus"
 *  active: false
 *  type: "direction"
 * }
 *
 * @returns Array of stops and departure, marked with hidden=true|false depending on filter
 */
function filterData(data, allFilters) {
  if (allFilters === undefined || data === undefined) {
    return data;
  }

  const copy = [...data];

  let departuresVisible;

  copy.forEach(item => {
    departuresVisible = false;

    if (item.stoptimesWithoutPatterns !== undefined) {
      item.stoptimesWithoutPatterns.forEach(departure => {
        if (
          allFilters.some(filter => {
            return (
              filter.headsign === departure.headsign &&
              filter.active === true &&
              (filter.routeShortName === departure.trip.routeShortName ||
                filter.type === "direction")
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

  if (allHidden(copy)) {
    copy.map(stop => {
      Vue.set(stop, "hidden", false);
      stop.stoptimesWithoutPatterns.map(departure => {
        Vue.set(departure, "hidden", false);
      });
    });
  }

  return copy;
}

/**
 * if all the data would be filtered, filter nothing
 */
function allHidden(departures) {
  if (departures === undefined) {
    return true;
  }
  return departures.every(departure => {
    return departure.hidden === true;
  });
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

export { filterData, markFavoriteLines, parseDirections, parseLines };

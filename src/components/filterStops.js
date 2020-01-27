import Vue from "vue";

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

export { filterData };

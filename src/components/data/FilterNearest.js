import { distance, formatDistance } from "./calculateDistance.js";

async function flattenNearest(response, lat, lon) {
  const responseJson = await response.json();
  const edges = responseJson.data.nearest.edges;
  const flattenStops = [];

  edges.forEach(stop => {
    const newStop = { ...stop.node.place };

    newStop.distance = formatDistance(
      distance(lat, lon, stop.node.place.lat, stop.node.place.lon)
    );

    flattenStops.push(newStop);
  });

  return flattenStops;
}

async function sortNearest(nearest) {
  return nearest.sort((a, b) => (a.distance > b.distance ? 1 : -1));
}

/**
 * Go through stops and departures. Remove departures with empty headsign. If all the departures
 * are without headsign, remove whole stop.
 *
 * Empty headsign means that the departure is not real, but bus/metro/train has arrived into its last station/stop
 *
 * @param {Array} stops
 */
function removeEmptyDestinations(stops) {
  return stops.filter(stop => {
    const stopTimesWithHeadsign = stop.stoptimesWithoutPatterns.filter(
      departure => {
        return departure.headsign !== null;
      }
    );
    stop.stoptimesWithoutPatterns = stopTimesWithHeadsign;

    return stopTimesWithHeadsign.length !== 0;
  });
}

export { flattenNearest, removeEmptyDestinations, sortNearest };

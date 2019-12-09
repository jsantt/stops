import { distance, formatDistance } from "./calculateDistance.js";

async function fetchNearest(lat, lon, stops) {
  const response = await window.fetch(
    "https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query: _query(lat, lon, stops)
      })
    }
  );
  const flattenAndSorted = await _flattenResult(response, lat, lon);
  return _removeEmptyDestinations(flattenAndSorted);
}

/**
 * Go through stops and departures. Remove the stop if all the departure headsign are empty.
 * Empty headsign means that the departure is not real, but bus/metro/train has arrived into its last station/stop
 *
 * @param {Array} stops
 */
function _removeEmptyDestinations(stops) {
  return stops.filter(stop => {
    const nonEmptyHeadsign = stop.stoptimesWithoutPatterns.filter(departure => {
      return departure.headsign !== undefined && departure.headsign != "";
    });
    return nonEmptyHeadsign !== undefined && nonEmptyHeadsign.length > 0;
  });
}

async function _flattenResult(response, lat, lon) {
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

  const sorted = flattenStops.sort((a, b) =>
    a.distance > b.distance ? 1 : -1
  );

  return sorted;
}

function _query(lat, lon, stops) {
  const stopsString = JSON.stringify(stops);
  return `
    {
        nearest(lat: ${lat}, lon: ${lon}, maxResults: 20, maxDistance: 2000, filterByPlaceTypes: [STOP] ${
    stops === undefined ? "" : `filterByIds:{stops: ${stopsString}}`
  }) {
          edges {
            node {
              distance
              place {
                id
                lat
                lon
                ... on Stop {
                  name
                  gtfsId
                  code
                  desc
                  locationType
                  vehicleType
                  stoptimesWithoutPatterns {
                    scheduledDeparture
                    departureDelay
                    realtime
                    realtimeState
                    headsign
                    serviceDay
                    trip {
                      id
                      routeShortName
                       alerts {
                        alertHeaderText
                        alertDescriptionText
                      }
                    }
                  }
                }
              }
            }
          }
        }
    }`;
}

export { fetchNearest };

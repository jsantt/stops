import { flattenNearest, sortNearest } from "./FilterNearest.js";

async function fetchNearest(lat, lon, stops) {
  const response = await window.fetch(
    "https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query: _queryBody(lat, lon, stops)
      })
    }
  );
  const flatten = await flattenNearest(response, lat, lon);
  const sorted = await sortNearest(flatten);
  return sorted;
}

function _queryBody(lat, lon, stops) {
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
                  lat
                  lon
                  name
                  gtfsId
                  code
                  desc
                  locationType
                  vehicleType
                  stoptimesWithoutPatterns(numberOfDepartures:5,omitNonPickups:true, omitCanceled:true) {
                    scheduledDeparture
                    departureDelay
                    realtime
                    realtimeState
                    headsign
                    trip {
                      id
                      directionId
                      routeShortName
                       alerts {
                        alertHeaderText
                        alertDescriptionText
                      }
                      route {
                        mode
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

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
        query: query(lat, lon, stops)
      })
    }
  );
  return await flattenResult(response, lat, lon);
}

async function flattenResult(response, lat, lon) {
  const responseJson = await response.json();
  const edges = responseJson.data.nearest.edges;
  const flatten = [];

  edges.forEach(stop => {
    const newStop = { ...stop.node.place };

    newStop.distance = formatDistance(
      distance(lat, lon, stop.node.place.lat, stop.node.place.lon)
    );

    flatten.push(newStop);
  });

  const sorted = flatten.sort((a, b) => (a.distance > b.distance ? 1 : -1));

  return sorted;
}

function query(lat, lon, stops) {
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

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
  return await flattenResult(response);
}

async function flattenResult(response) {
  const responseJson = await response.json();
  const edges = responseJson.data.nearest.edges;
  const flatten = [];

  edges.forEach(stop => {
    const newStop = { ...stop.node.place };
    newStop.distance = stop.node.distance;
    flatten.push(newStop);
  });
  return flatten;
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

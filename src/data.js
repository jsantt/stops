function query(lat, lon) {
  return `
    {
        nearest(lat: ${lat}, lon: ${lon}, maxResults: 8, maxDistance: 2000, filterByPlaceTypes: [STOP]) {
          edges {
            node {
              place {
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
                    trip {
                      routeShortName
                    }
                  }
                }
              }
              distance
            }
          }
        }
    }`;
}

async function fetchSchedule(lat, lon) {
  const response = await window.fetch(
    "https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query: query(lat, lon)
      })
    }
  );
  return await response.json();
}

export { fetchSchedule };

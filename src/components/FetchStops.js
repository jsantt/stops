async function fetchStops(stops) {
  const response = await window.fetch(
    "https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query: query(stops)
      })
    }
  );
  return await flattenResult(response);
}

async function flattenResult(response) {
  const responseJson = await response.json();
  return responseJson.data.stops;
}

function query(stops) {
  const stopsString = JSON.stringify(stops);
  return `
    {
      stops(ids: ${stopsString}) {
        lat
        lon
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
    }`;
}

export { fetchStops };

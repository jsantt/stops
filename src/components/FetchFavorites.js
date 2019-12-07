import { distance, formatDistance } from "./calculateDistance.js";

async function fetchFavorites(stops, lat, lon) {
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
  const flatten = await flattenResult(response);

  let distanceAdded = [];

  flatten.forEach(stop => {
    const newStop = { ...stop };
    newStop.distance = formatDistance(distance(lat, lon, stop.lat, stop.lon));
    distanceAdded.push(newStop);
  });

  const sorted = distanceAdded.sort((a, b) =>
    a.distance > b.distance ? 1 : -1
  );

  return sorted;
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
            id
            routeShortName
          }
        }
      }
    }`;
}

export { fetchFavorites };

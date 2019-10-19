async function fetchStops(stops, lat, lon) {
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
    newStop.distance = Math.round(
      distance(lat, lon, stop.lat, stop.lon) * 1000
    );
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
            routeShortName
          }
        }
      }
    }`;
}

/* Formula from https://stackoverflow.com/questions/18883601/function-to-calculate-distance-between-two-coordinates*/

function distance(lat1, lon1, lat2, lon2) {
  const R = 6371; // km
  const dLat = toRadian(lat2 - lat1);
  const dLon = toRadian(lon2 - lon1);
  const latitude1 = toRadian(lat1);
  const latitude2 = toRadian(lat2);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) *
      Math.sin(dLon / 2) *
      Math.cos(latitude1) *
      Math.cos(latitude2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d;
}

// Converts numeric degrees to radians
function toRadian(degrees) {
  return (degrees * Math.PI) / 180;
}

export { fetchStops };

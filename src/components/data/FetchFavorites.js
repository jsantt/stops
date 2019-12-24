import {
  addDistance,
  flattenFavorite,
  sortByDistance
} from "./FilterFavorite.js";

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
  const flatten = await flattenFavorite(response);
  const distanceAdded = addDistance(flatten, lat, lon);
  const sortedByDistance = sortByDistance(distanceAdded);

  return sortedByDistance;
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
        stoptimesWithoutPatterns(numberOfDepartures:6,omitNonPickups:true, omitCanceled:true) {
          scheduledDeparture
          departureDelay
          realtime
          realtimeState
          headsign
          serviceDay
          trip {
            id
            directionId
            routeShortName
          }
        }
      }
    }`;
}

export { fetchFavorites };

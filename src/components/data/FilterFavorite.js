import { distance, formatDistance } from "./calculateDistance.js";

async function flattenFavorite(response) {
  const responseJson = await response.json();
  return responseJson.data.stops;
}

function addDistance(favoriteData, lat, lon) {
  let distanceAdded = [];

  favoriteData.forEach(stop => {
    const newStop = { ...stop };
    newStop.distance = formatDistance(distance(lat, lon, stop.lat, stop.lon));
    distanceAdded.push(newStop);
  });

  return distanceAdded;
}

function sortByDistance(data) {
  const sorted = data.sort((a, b) => (a.distance > b.distance ? 1 : -1));
  return sorted;
}

export { addDistance, flattenFavorite, sortByDistance };

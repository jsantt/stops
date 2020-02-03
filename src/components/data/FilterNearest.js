import { calculateDistance, formatDistance } from "./calculateDistance.js";

async function flattenNearest(response, lat, lon) {
  const responseJson = await response.json();
  const edges = responseJson.data.nearest.edges;
  const flattenStops = [];

  edges.forEach(stop => {
    const newStop = { ...stop.node.place };

    newStop.distance = formatDistance(
      calculateDistance(lat, lon, stop.node.place.lat, stop.node.place.lon)
    );

    flattenStops.push(newStop);
  });

  return flattenStops;
}

async function sortNearest(nearest) {
  return nearest.sort((a, b) => (a.distance > b.distance ? 1 : -1));
}

export { flattenNearest, sortNearest };

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

function formatDistance(distance) {
  const meters = Math.round(distance * 1000);

  return meters;
}

export { distance, formatDistance };

const query = `
{
nearest(lat: 60.16172, lon: 24.65164, maxResults: 8, maxDistance: 1500, filterByPlaceTypes: [STOP]) {
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
        scheduledArrival 
        realtimeArrival 
        arrivalDelay 
        scheduledDeparture 
        realtimeDeparture 
        departureDelay 
        realtime 
        realtimeState
        headsign
        trip{
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

async function fetchSchedule() {
  const response = await window.fetch(
    "https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query: query
      })
    }
  );
  return await response.json();
}

export { fetchSchedule };

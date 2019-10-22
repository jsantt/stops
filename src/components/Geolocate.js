function geolocate() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          resolve({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });
        },
        error => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              reject(new Error("Salli paikannus käyttääksesi palvelua"));
              break;
            case error.POSITION_UNAVAILABLE:
              reject(new Error("Lokaatiota ei saatavilla"));
              break;
            case error.TIMEOUT:
              reject(
                new Error("Paikantaminen kesti liian kauan ja epäonnistui")
              );
              break;
            case error.UNKNOWN_ERROR:
              reject(new Error("Tuntematon virhe paikannuksessa"));
          }
        }
      );
    } else {
      reject(new Error("Käyttämäsi selain ei tue paikannusta"));
    }
  });
}

export { geolocate };

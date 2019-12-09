function geolocate() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          resolve({
            accuracy: position.coords.accuracy,
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });
        },
        error => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              reject({
                header: "Salli paikannus",
                body:
                  "Sijaintiasi käytetään vain lähimpien pysäkkien löytämiseksi",
                button: "ok"
              });
              break;
            case error.POSITION_UNAVAILABLE:
              reject({
                header: "Lokaatiota ei saatavilla",
                body: "Kokeile uudestaan",
                button: "ok"
              });
              break;
            case error.TIMEOUT:
              reject({
                header: "Aikakatkaisu",
                body: "Lokaatiota ei löytynyt",
                button: "ok"
              });
              break;
            case error.UNKNOWN_ERROR:
              reject({
                header: "Tuntematon virhe",
                body: "Tuntematon virhe, kokeile uudestaan",
                button: "ok"
              });
          }
        },
        { maximumAge: 0, enableHighAccuracy: true, timeout: 30000 }
      );
    } else {
      reject(new Error("Käyttämäsi selain ei tue paikannusta"));
    }
  });
}

export { geolocate };

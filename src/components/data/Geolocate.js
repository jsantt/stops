function geolocate() {
  return new Promise((resolve, reject) => {
    if (window.navigator.onLine === false) {
      reject({
        header: "Ei internet-yhteyttä",
        body: "Kokeile uudestaan",
        button: "ok"
      });
    }

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
                  "Olethan sallinut paikannuksen selaimesi asetuksista. Sijaintiasi käytetään vain lähimpien pysäkkien löytämiseen",
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
        { maximumAge: 0, enableHighAccuracy: true, timeout: 5000 }
      );
    } else {
      reject(new Error("Käyttämäsi selain ei tue paikannusta"));
    }
  });
}

export { geolocate };

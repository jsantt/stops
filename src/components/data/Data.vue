<template>
  <span></span>
</template>
<script>
import { fetchFavorites } from "./FetchFavorites.js";
import { fetchNearest } from "./FetchNearest.js";
import { geolocate } from "./Geolocate.js";

export default {
  name: "Data",
  props: {
    favoriteStops: Array,
    fetchFavorites: Boolean
  },
  data: function() {
    return {
      pollingHandle: undefined,
      previousFetchTime: 0,
      watchPositionHandle: undefined
    };
  },
  methods: {
    /**
     * start polling with default coordinates (before geolocation permissions)
     * @public
     */
    startPollingDefault() {
      const coordinates = {
        accuracy: null,
        lat: 60.16704004097834,
        lon: 24.946832000000086
      };
      window.localStorage.setItem("coordinates", JSON.stringify(coordinates));

      this.fetch();
      this.pollingHandle = setInterval(this.fetch, 15 * 1000);
    },

    /**
     * start polling and continue it every 15 seconds
     * @public
     */
    async startPolling() {
      //clearInterval(this.pollingHandle); // stop default polling
      document.removeEventListener("visibilitychange", this.visibilityChange);
      document.addEventListener("visibilitychange", this.visibilityChange);

      this.stopPositionWatching();
      this.watchPosition();
    },

    visibilityChange() {
      if (document.visibilityState === "visible") {
        this.fetch();
      }
    },

    async fetch() {
      const coords = JSON.parse(window.localStorage.getItem("coordinates"));
      this.notifyIfInaccurateLocation(coords);

      this.$emit("fetching-data");

      try {
        const [nearest, favorite] = await Promise.all([
          fetchNearest(coords.lat, coords.lon),
          fetchFavorites(this.favoriteStops, coords.lat, coords.lon)
        ]);

        const result = {
          nearest,
          favorite,
          lat: coords.lat,
          lon: coords.lon
        };

        this.$emit("departure-data", result);
      } catch (e) {
        const message = {
          header: "Virhe haettaessa aikatauluja",
          body: "Kokeile uudestaan",
          button: "ok"
        };

        this.$emit("location-error", message);
      }
    },
    watchPosition() {
      this.$emit("finding-location");
      this.$emit("location-error", {
        body: `Haetaan sijaintia`
      });
      this.watchPositionHandle = navigator.geolocation.watchPosition(
        this.onLocationFound,
        this.onLocationError,
        {
          maximumAge: 5000,
          enableHighAccuracy: false,
          timeout: 8000
        }
      );
    },
    onLocationFound(position) {
      this.$emit("location-error", undefined);

      const coordinates = {
        accuracy: position.coords.accuracy,
        lat: position.coords.latitude,
        lon: position.coords.longitude
      };
      window.localStorage.setItem("coordinates", JSON.stringify(coordinates));

      this.fetch();
    },
    onLocationError(error) {
      let message;

      switch (error.code) {
        case error.PERMISSION_DENIED:
          message = {
            header: "Salli paikannus",
            body:
              "Sallithan paikannuksen selaimesi asetuksista. Sijaintiasi käytetään vain lähimpien pysäkkien löytämiseen",
            button: "ok"
          };
          break;
        case error.POSITION_UNAVAILABLE:
          message = {
            header: "Lokaatiota ei saatavilla",
            body: "Kokeile uudestaan",
            button: "ok"
          };
          break;
        case error.TIMEOUT:
          message = {
            header: "Aikakatkaisu",
            body: "Lokaatiota ei löytynyt",
            button: "ok"
          };
          break;
        case error.UNKNOWN_ERROR:
          message = {
            header: "Tuntematon virhe",
            body: "Tuntematon virhe, kokeile uudestaan",
            button: "ok"
          };
      }
      this.$emit("location-error", message);
    },
    notifyIfInaccurateLocation(coordinates) {
      if (coordinates === undefined) {
        return;
      }

      if (coordinates.accuracy !== null && coordinates.accuracy > 50) {
        this.$emit("location-error", {
          body: `Sijainti epätarkka (${Math.ceil(coordinates.accuracy)}m)`
        });
      }
    },
    stopPositionWatching() {
      if (this.watchPositionHandle === undefined) {
        return;
      }
      navigator.geolocation.clearWatch(this.watchPositionHandle);
      this.watchPositionHandle = undefined;
    }
  }
};
</script>

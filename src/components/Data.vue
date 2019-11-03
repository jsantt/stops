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
      pollingHandle: undefined
    };
  },
  methods: {
    startPolling: function() {
      this.stopPolling();

      document.addEventListener("visibilitychange", this.visibilityChange);

      this.locateAndfetch();

      this.pollingHandle = setInterval(this.locateAndfetch, 15 * 1000);
    },
    stopPolling: function() {
      if (this.pollingHandle !== undefined) {
        clearInterval(this.pollingHandle);
        document.removeEventListener("visibilitychange", this.visibilityChange);
      }
    },
    visibilityChange: function() {
      if (document.visibilityState === "visible") {
        this.locateAndfetch();
      }
    },
    locateAndfetch: async function() {
      try {
        const location = await geolocate();

        const nearestData = await fetchNearest(location.lat, location.lon);
        this.$emit("nearest-stops", nearestData);

        const favoriteData = await fetchFavorites(
          this.favoriteStops,
          location.lat,
          location.lon
        );
        this.$emit("favorite-stops", favoriteData);
      } catch (exception) {
        this.$emit("location-error", exception);
      }
    }
  }
};
</script>

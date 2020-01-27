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
    /**
     * start polling with default coordinates (before geolocation permissions)
     * @public
     */
    startPollingDefault: function(coordinates) {
      this.fetch(coordinates);

      this.pollingHandle = setInterval(() => {
        this.fetch(coordinates);
      }, 15 * 1000);
    },
    /**
     * start polling and continue it every 15 seconds
     * @public
     */
    startPolling: async function() {
      this.stopPolling();
      document.addEventListener("visibilitychange", this.visibilityChange);

      const coordinates = await this.locate();
      if (coordinates !== undefined) {
        this.fetch(coordinates);
      }

      this.pollingHandle = setInterval(async () => {
        const coordinates = await this.locate();
        if (coordinates !== undefined) {
          this.fetch(coordinates);
        }
      }, 15 * 1000);
    },
    stopPolling: function() {
      if (this.pollingHandle !== undefined) {
        clearInterval(this.pollingHandle);
        document.removeEventListener("visibilitychange", this.visibilityChange);
      }
    },
    visibilityChange: function() {
      if (document.visibilityState === "visible") {
        this.startPolling();
      }
    },
    locate: async function() {
      this.$emit("finding-location");
      try {
        const coordinates = await geolocate();
        if (coordinates.accuracy !== null && coordinates.accuracy > 50) {
          this.$emit("location-error", {
            body: `Sijainti epätarkka (${Math.ceil(coordinates.accuracy)}m)`
          });
        }

        return coordinates;
      } catch (exception) {
        this.$emit("location-error", exception);
        return undefined;
      }
    },
    fetch: async function(coordinates) {
      this.$emit("fetching-nearest");
      const nearestData = await fetchNearest(coordinates.lat, coordinates.lon);
      this.$emit("nearest-stops", nearestData);

      this.$emit("fetching-favorites");
      const favoriteData = await fetchFavorites(
        this.favoriteStops,
        coordinates.lat,
        coordinates.lon
      );
      this.$emit("favorite-stops", favoriteData);
    }
  }
};
</script>

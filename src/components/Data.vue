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
    startPollingDefault: function(coordinates) {
      this.fetch(coordinates);

      this.pollingHandle = setInterval(() => {
        this.fetch(coordinates);
      }, 15 * 1000);
    },
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
    },
    locateAndfetch: async function(location) {
      try {
        const coordinate =
          location !== undefined ? location : await geolocate();

        const nearestData = await fetchNearest(coordinate.lat, coordinate.lon);
        this.$emit("nearest-stops", nearestData);

        const favoriteData = await fetchFavorites(
          this.favoriteStops,
          coordinate.lat,
          coordinate.lon
        );

        this.$emit("favorite-stops", favoriteData);
      } catch (exception) {
        this.$emit("location-error", exception);
      }
    }
  }
};
</script>

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
  methods: {
    startPolling: function() {
      document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "visible") {
          this.locateAndfetch();
        }
      });

      this.locateAndfetch();

      setInterval(() => {
        this.locateAndfetch();
      }, 15 * 1000);
    },
    locateAndfetch: async function() {
      try {
        const location = await geolocate();

        const stops =
          this.fetchFavorites === true
            ? await fetchFavorites(
                this.favoriteStops,
                location.lat,
                location.lon
              )
            : await fetchNearest(location.lat, location.lon);

        this.$emit("nearest-stops", stops);
      } catch (exception) {
        this.$emit("location-error", exception);
      }
    }
  }
};
</script>

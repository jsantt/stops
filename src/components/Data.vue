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
    favoriteStops: Array
  },
  mounted: function() {
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
  methods: {
    locateAndfetch: async function() {
      try {
        const location = await geolocate();
        console.log("hip");
        console.log(this.favoriteStops);
        const stops =
          this.favoriteStops === undefined
            ? await fetchNearest(location.lat, location.lon)
            : await fetchFavorites(
                this.favoriteStops,
                location.lat,
                location.lon
              );

        this.$emit("nearest-stops", stops);
      } catch (exception) {
        alert(exception);
        this.$emit("location-error", exception);
      }
    }
  }
};
</script>

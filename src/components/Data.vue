<template>
  <span></span>
</template>
<script>
import { fetchStops } from "./FetchStops.js";
import { fetchNearest } from "./FetchNearest.js";
import { geolocate } from "./Geolocate.js";

export default {
  name: "Data",
  props: {
    favoriteStops: Array
  },
  mounted: async function() {
    document.addEventListener("visibilitychange", async () => {
      if (document.visibilityState === "visible") {
        this.locateAndfetch();
      }
    });

    this.locateAndfetch();

    setInterval(async () => {
      this.locateAndfetch();
    }, 20 * 1000);
  },
  methods: {
    locateAndfetch: async function() {
      const location = await geolocate();
      const stops =
        this.favoriteStops === undefined
          ? await fetchNearest(location.lat, location.lon)
          : await fetchStops(this.favoriteStops);

      this.$emit("nearest-stops", stops);
    }
  }
};
</script>

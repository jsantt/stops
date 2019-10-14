<template>
  <div>
    <div v-for="stop in stops">
      <section>
        <Stop :stop="stop"></Stop>
        <Departures
          :departures="stop.node.place.stoptimesWithoutPatterns"
          :timeNow="timeNow"
          :realtime="realtime"
        ></Departures>
      </section>
    </div>
  </div>
</template>

<script>
import { geolocate } from "./Geolocate.js";
import Data from "./Data.vue";
import Departures from "./Departures.vue";
import Stop from "./Stop.vue";

export default {
  name: "Schedule",
  props: {
    realtime: Boolean,
    stop: Object
  },
  components: {
    Data,
    Departures,
    Stop
  },
  data() {
    return {
      stops: [],
      timeNow: new Date()
    };
  },
  async mounted() {
    const location = await geolocate();
    this.fetchSchedule(location.lat, location.lon);

    setInterval(async () => {
      const location = await geolocate();
      console.log("updated");
      this.fetchSchedule(location.lat, location.lon);
    }, 20 * 1000);
  },
  methods: {
    fetchSchedule: async function(lat, lon) {
      const result = await Data.fetchSchedule(lat, lon);
      this.timeNow = new Date();
      this.stops = result.data.nearest.edges;
    }
  }
};
</script>

<!--style scoped>
</style-->

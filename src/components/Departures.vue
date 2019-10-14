<template>
  <div>
    <article class="secondary">
      <div></div>
      <div>MIN</div>
      <div>LINJA</div>
      <div>MÄÄRÄNPÄÄ</div>
    </article>

    <article v-for="time in departures">
      <div v-bind:class="{ 'realtime-sign': time.realtime && realtime }"></div>
      <div>
        <span
          v-show="!realtime"
          data-hook="time-schedule"
        >{{ timeToString(toHourAndMinutes(time.scheduledDeparture)) }}</span>

        <span v-show="realtime">
          {{
          toRealtime(
          timeNow,
          time.scheduledDeparture,
          time.departureDelay,
          time.realtime,
          time.serviceDay
          )
          }}
        </span>
      </div>
      <div>{{ time.trip.routeShortName }}</div>
      <div>{{ time.headsign }}</div>
      <div></div>
    </article>
  </div>
</template>

<script>
export default {
  name: "Schedule",
  props: {
    departures: Array,
    realtime: Boolean,
    timeNow: Date
  },

  methods: {
    dayNumber(unixTime) {
      return new Date(unixTime * 1000).getDate();
    },
    toHourAndMinutes: function(seconds) {
      const hours = Math.floor(seconds / (60 * 60));
      const hoursInSeconds = hours * 60 * 60;
      const minutes = Math.floor((seconds - hoursInSeconds) / 60);

      return { hours: hours, minutes: minutes };
    },

    timeToString: function(time) {
      const hours = time.hours > 9 ? `${time.hours}` : `0${time.hours}`;
      const minutes = time.minutes > 9 ? `${time.minutes}` : `0${time.minutes}`;

      return `${hours}.${minutes}`;
    },

    //TODO: over 12 pm leaving busses are shown as -1025, -1048 etc
    toRealtime: function(timeNow, departure, delay, realtime, serviceDay) {
      const day = this.dayNumber(serviceDay);
      const today = timeNow.getDate();

      const secondsNow = this.getSecondsSinceMidnight(timeNow);

      const scheduledDeparture = Math.floor((departure - secondsNow) / 60);

      if (scheduledDeparture > 59 || scheduledDeparture < -30) {
        return this.timeToString(this.toHourAndMinutes(departure));
      }

      if (departure < 30 || departure - delay < 30) {
        return `&#126;0`;
      }

      if (Math.abs(delay) < 30) {
        return `${scheduledDeparture}`;
      }

      if (delay > 0) {
        return `${scheduledDeparture}-${scheduledDeparture +
          Math.ceil(delay / 60)}*`;
      }
      if (delay < 0) {
        return `${scheduledDeparture +
          Math.ceil(delay / 60)}*-${scheduledDeparture}`;
      }

      const rounded = Math.floor((departure - delay) / 60);

      return `${rounded} ${departure}${delay}`;
    },
    getSecondsSinceMidnight: function(time) {
      let timeCopy = new Date(time);
      const milliseconds = time - timeCopy.setHours(0, 0, 0, 0);
      return milliseconds / 1000;
    }
  }
};
</script>

<!--style scoped>
</style-->

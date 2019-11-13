<style scoped>
article {
  display: grid;
  grid-template-columns: 0.75rem 4rem 3.5rem auto 2rem;
}
.header {
  font-size: 16px;
}
.header,
.departure {
  padding: 0.45rem 0;
}
.secondary {
  color: var(--color-secondary);
  font-size: 18px;
}

.departure:nth-child(even) {
  background-color: #f0f8ff;
}
.no-departures {
  text-align: center;
}
.time,
.line {
  font-size: 20px;
}

.realtime-sign {
  margin: auto;
  color: green;
  display: inline-block;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: green;
  cursor: pointer;
  box-shadow: 0 0 0 lightgreen;
  animation: pulse 2s infinite;
}
.realtime-sign:hover {
  animation: none;
}

@-webkit-keyframes pulse {
  0% {
    -webkit-box-shadow: 0 0 0 0 rgba(44, 204, 52, 0.4);
  }
  70% {
    -webkit-box-shadow: 0 0 0 10px rgba(44, 204, 44, 0);
  }
  100% {
    -webkit-box-shadow: 0 0 0 0 rgba(44, 204, 57, 0);
  }
}
@keyframes pulse {
  0% {
    -moz-box-shadow: 0 0 0 0 rgba(44, 204, 65, 0.4);
    box-shadow: 0 0 0 0 rgba(44, 204, 52, 0.4);
  }
  70% {
    -moz-box-shadow: 0 0 0 10px rgba(57, 204, 44, 0);
    box-shadow: 0 0 0 10px rgba(44, 204, 44, 0);
  }
  100% {
    -moz-box-shadow: 0 0 0 0 rgba(63, 204, 44, 0);
    box-shadow: 0 0 0 0 rgba(57, 204, 44, 0);
  }
}
</style>

<template>
  <div>
    <div v-if="departures.length < 1" class="no-departures">&mdash;</div>
    <!--article v-if="departures.length > 0" class="secondary header">
      <div></div>
      <div>
        <span v-show="realtime">MIN</span>
        <span v-show="!realtime">KLO</span>
      </div>
      <div>LINJA</div>
      <div>MÄÄRÄNPÄÄ</div>
    </article-->

    <article
      class="departure"
      v-for="time in departures"
      v-bind:key="time.scheduledArrival"
    >
      <div v-bind:class="{ 'realtime-sign': time.realtime && realtime }"></div>
      <div class="time">
        <span v-show="!realtime" data-hook="time-schedule">{{
          timeToString(toHourAndMinutes(time.scheduledDeparture))
        }}</span>

        <span v-show="realtime">
          <!--span>showEarlierTime</span>
          <span v-if="aheadschedule"></span>
          <span>showLaterTime</span>
          <span v-if="!aheadShedule"></span-->
          {{
            toRealtime(
              new Date(),
              time.scheduledDeparture,
              time.departureDelay,
              time.realtime,
              time.serviceDay
            )
          }}
        </span>
      </div>
      <div class="line">{{ time.trip.routeShortName }}</div>
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
    realtime: Boolean
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

    toRealtime: function(timeNow, departure, delay) {
      const secondsNow = this.getSecondsSinceMidnight(timeNow);

      const scheduledDeparture = Math.floor((departure - secondsNow) / 60);

      if (scheduledDeparture > 59 || scheduledDeparture < -30) {
        return this.timeToString(this.toHourAndMinutes(departure));
      }

      const shownDeparture = scheduledDeparture > 0 ? scheduledDeparture : 0;
      let shownDepartureWithDelay = scheduledDeparture + Math.ceil(delay / 60);
      shownDepartureWithDelay =
        shownDepartureWithDelay > 0 ? shownDepartureWithDelay : 0;

      if (shownDepartureWithDelay === shownDeparture) {
        return shownDeparture;
      }
      if (shownDeparture < shownDepartureWithDelay) {
        return `${shownDeparture}-${shownDepartureWithDelay}*`;
      } else {
        return `${shownDepartureWithDelay}*-${shownDeparture}`;
      }
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

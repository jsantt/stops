<style scoped>
.departures {
  background-color: var(--color-blue-500);
  border-radius: 0.75rem;
  margin: var(--space-s) 0;
  padding: var(--space-m);
}
.favorite {
  background-color: var(--color-green-500);
}

article {
  display: grid;
  grid-template-columns: 0.75rem 4rem 3.5rem auto 2rem;
  grid-gap: var(--space-s);
}

.header,
.departure {
  padding: 0.45rem 0;
}
.secondary {
  color: var(--color-secondary);
}

.departure--favorite {
  background-color: var(--color-main-favorite);
}
.departure--hidden {
  opacity: 0.3;
}
.no-departures {
  text-align: center;
}
.time,
.line {
}

.realtime-sign {
  margin: auto;
  color: var(--color-tertiary);
  display: inline-block;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--color-tertiary);
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
  <div class="departures" v-bind:class="{ favorite: isFavorite }">
    <div v-if="departures.length < 1" class="no-departures">&mdash;</div>

    <article
      class="departure"
      v-bind:class="{ 'departure--favorite': departure.favorite === true, 'departure--hidden': departure.hidden === true }"
      v-for="departure in departures"
      v-on:click="addLine(departure)"
    >
      <div v-bind:class="{ 'realtime-sign': departure.realtime && realtime }"></div>
      <div class="time">
        <span v-show="!realtime" data-hook="time-schedule">
          {{
          timeToString(toHourAndMinutes(departure.scheduledDeparture))
          }}
        </span>

        <span v-show="realtime">
          <!--span>showEarlierTime</span>
          <span v-if="aheadschedule"></span>
          <span>showLaterTime</span>
          <span v-if="!aheadShedule"></span-->
          {{
          toRealtime(
          new Date(),
          departure.scheduledDeparture,
          departure.departureDelay,
          departure.realtime,
          departure.serviceDay
          )
          }}
        </span>
      </div>
      <div class="line">{{ departure.trip.routeShortName }}</div>
      <div>{{ departure.headsign }}</div>
      <div></div>
    </article>
  </div>
</template>

<script>
export default {
  name: "Schedule",
  props: {
    departures: Array,
    isFavorite: Boolean,
    realtime: Boolean
  },

  methods: {
    addLine(departure) {
      const route = departure.trip.routeShortName;
      let favoritesString = window.localStorage.getItem("favoriteLines");

      if (favoritesString == null) {
        favoritesString = "[]";
      }

      let favoriteLines = JSON.parse(favoritesString);

      if (favoriteLines.includes(route)) {
        favoriteLines = favoriteLines.filter(line => line !== route);
      } else {
        favoriteLines.push(route);
      }
      window.localStorage.setItem(
        "favoriteLines",
        JSON.stringify(favoriteLines)
      );

      this.$emit("add-favorite-line", {
        routeShortName: departure.trip.routeShortName,
        headsign: departure.headsign
      });
    },
    isFavorite(departure) {
      const route = departure.trip.routeShortName;
      let favoritesString = window.localStorage.getItem("favoriteLines");
      if (favoritesString == null) {
        return false;
      }

      let favoriteLines = JSON.parse(favoritesString);
      return favoriteLines.includes(route);
    },
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

      const scheduledDeparture = Math.round((departure - secondsNow) / 60);

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

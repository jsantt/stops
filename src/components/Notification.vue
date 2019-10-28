<style scoped>
.notification {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto 4rem;

  padding: 0rem 1rem 1rem 1rem;
  max-width: var(--main-width);
}
h2 {
  margin: 1rem 0;
  text-align: center;
  font-size: 28px;
}
main {
  padding: 0.5rem 0 1.5rem 0;
}

footer {
  padding: 0;
}

button {
  all: unset;
  box-sizing: border-box;

  text-align: center;
  text-transform: uppercase;

  background-color: #008b8b;
  border-radius: 4px;

  color: #fff;
  font-weight: 700;
  padding: 1rem;
  width: 100%;
}
</style>

<template>
  <div class="notification" role="dialog" aria-modal="true">
    <h2>
      <div>
        <svg
          class="icon"
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
        >
          <path
            d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
          />
        </svg>
      </div>
      Tarvitsemme sijaintisi
    </h2>
    <main>
      Jotta voimme näyttää lähimmät pysäkit. Sijaintiasi ei tallenneta
      mihinkään.
    </main>
    <footer>
      <button v-on:click="$emit('open-locate-prompt')">
        Jatka sallimaan sijainti
      </button>
    </footer>
  </div>
</template>

<script>
export default {
  name: "Notification",
  methods: {
    allowLocation: function() {}
  }
};
</script>

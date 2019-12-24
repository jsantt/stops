<style scoped>
.message-body {
  max-height: 40rem;
  overflow: hidden;
  transition: 0.4s ease all;
  will-change: height;
}

.is-closed .message-body {
  max-height: 0;
}
svg {
  margin-top: 0.4rem;
}
.svg--open {
  transform: rotateX(180deg);
}
</style>
<template>
  <section class="section container">
    <article class="message" :class="accordionClasses">
      <div class="message-header" @click="toggleAccordion">
        <slot name="header"></slot>
      </div>
      <div class="message-body">
        <div class="message-content">
          <slot name="body"></slot>
        </div>
      </div>
    </article>
  </section>
</template>

<script>
export default {
  name: "s-tag",
  props: {
    noHandle: Boolean
  },
  data: function() {
    return {
      isOpen: false
    };
  },
  methods: {
    close: function() {
      this.isOpen = false;
    },
    open: function() {
      this.isOpen = true;
    },
    toggleAccordion: function() {
      this.isOpen = !this.isOpen;
    }
  },
  computed: {
    accordionClasses: function() {
      return {
        "is-closed": !this.isOpen,
        "is-primary": this.isOpen
      };
    }
  }
};
</script>

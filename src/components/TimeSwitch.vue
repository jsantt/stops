<style scoped>
.onoffswitch {
  margin-top: 6px;
  margin-bottom: 2px;
  position: relative;
  width: 43px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}
.onoffswitch-checkbox {
  display: none;
}
.onoffswitch-label {
  display: block;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid #000;
  border-radius: 20px;
}
.onoffswitch-inner {
  display: block;
  width: 200%;
  margin-left: -100%;
  transition: margin 0.3s ease-in 0s;
}
.onoffswitch-inner:before,
.onoffswitch-inner:after {
  display: block;
  float: left;
  width: 50%;
  height: 12px;
  padding: 0;
  line-height: 12px;
  font-size: 12px;
  color: white;
  font-family: Trebuchet, Arial, sans-serif;
  font-weight: bold;
  box-sizing: border-box;
}
.onoffswitch-inner:before {
  content: "";
  padding-left: 10px;
  background-color: #000;
  color: #ffffff;
}
.onoffswitch-inner:after {
  content: "";
  padding-right: 10px;
  background-color: #fff;
  color: #000;
  text-align: right;
}
.onoffswitch-switch {
  display: block;
  width: 17px;
  margin: -2.5px;
  background: #ffffff;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 27px;
  border: 2px solid #000;
  border-radius: 20px;
  transition: all 0.3s ease-in 0s;
}
.onoffswitch-checkbox:checked + .onoffswitch-label .onoffswitch-inner {
  margin-left: 0;
}
.onoffswitch-checkbox:checked + .onoffswitch-label .onoffswitch-switch {
  right: 0px;
}
</style>

<template>
  <div class="onoffswitch">
    <input
      @change="checkboxChanged()"
      type="checkbox"
      name="onoffswitch"
      class="onoffswitch-checkbox"
      id="myonoffswitch"
      checked
    />
    <label class="onoffswitch-label" for="myonoffswitch">
      <span class="onoffswitch-inner"></span>
      <span class="onoffswitch-switch"></span>
    </label>
  </div>
</template>

<script>
export default {
  name: "TimeSwitch",
  methods: {
    checkboxChanged() {
      this.$emit("time-switch-clicked");
    }
  }
};
</script>

<template>
<div class="columns">
  <div class="column col-4">
    <span class="text-secondary">Hydrogen</span>
    <meter class="meter" v-bind:value="hydrogen" optimum="90" min="0" max="100" low="30" high="80"></meter>
  </div>
  <div class="column col-4">
    <span class="text-secondary">Oxygen</span>
    <meter class="meter" v-bind:value="oxygen" optimum="90" min="0" max="100" low="30" high="80"></meter>
  </div>
  <div class="column col-4">
    <span class="text-secondary">Carbon</span>
    <meter class="meter" v-bind:value="carbon" optimum="90" min="0" max="100" low="30" high="80"></meter>
  </div>
  </div>
</template>
<script>
export default {
  name: 'LiquidGasPanel',
  data () {
    return {
      hydrogen: 33,
      oxygen: 66,
      carbon: 99
    }
  }
}
</script>

<template>
<div class="columns">
  <div class="column col-4">
    <span class="text-secondary">Hydrogen</span>
    <meter class="meter" v-bind:value="hydrogen" optimum="90" min="0" v-bind:max="hydrogenCapacity" low="30" high="80"></meter>
  </div>
  <div class="column col-4">
    <span class="text-secondary">Oxygen</span>
    <meter class="meter" v-bind:value="oxygen" optimum="90" min="0" v-bind:max="oxygenCapacity" low="30" high="80"></meter>
  </div>
  <div class="column col-4">
    <span class="text-secondary">Carbon</span>
    <meter class="meter" v-bind:value="carbon" optimum="90" min="0" v-bind:max="carbonCapacity" low="30" high="80"></meter>
  </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'LiquidGasPanel',
  data () {
    return {

    }
  },
  computed: mapGetters([
    'hydrogen',
    'oxygen',
    'carbon',
    'hydrogenCapacity',
    'oxygenCapacity',
    'carbonCapacity'
  ])
}
</script>

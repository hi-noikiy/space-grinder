<template>
    <div class='columns col-online hud'>
      <div id="v" class='column col-1'>
        <span class="tooltip tooltip-bottom" v-bind:data-tooltip="`Cell Voltage: ${voltage}V`">
          {{voltage | exponentialize}}V
        </span>
      </div>
      <div id="mah" class='column col-1'>
        <span class="tooltip tooltip-bottom" v-bind:data-tooltip="`AmpHour Capacity: ${amps}mAh`">
          {{amps | exponentialize}}mAh
        </span>
      </div>
      <div id="j" class='column col-1'>
        <span class="tooltip tooltip-bottom" v-bind:data-tooltip="`Energy: ${joules}J`">
          {{joules | exponentialize}}J
        </span>
      </div>
      <div id="c" class='column col-2'>
        <span class="tooltip tooltip-bottom" v-bind:data-tooltip="`Charge Capacity: ${coulombs}/${capacity}C`">
          {{coulombs | exponentialize}}/{{capacity | exponentialize}}C
        </span>
      </div>
      <div id="cps" class='column col-2'>
        <span class="tooltip tooltip-bottom" v-bind:data-tooltip="`Production: ${coulumbsPerSecons}C/s`">
          {{coulumbsPerSecons | exponentialize}}C/s
        </span>
      </div>
      <div id="kg" class='column col-1'>
        <span class="tooltip tooltip-bottom" v-bind:data-tooltip="`Mass of spaceship: ${mass}kg`">
          {{mass | exponentialize}}kg
        </span>
      </div>
      <div id="d" class='column col-1 text-bold'>
        <span class="tooltip tooltip-bottom" v-bind:data-tooltip="`Approximate jump distance: ${distance}m`">
          {{distance | exponentialize}}m
        </span>
      </div>
      <div id="m" class='column col-1'>
        <span class="tooltip tooltip-bottom" v-bind:data-tooltip="`Minerals: ${minerals}g`">
          {{minerals | exponentialize}}g
        </span>
      </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Hud',
  data () {
    return {
    }
  },
  filters: {
  },
  computed: mapGetters([
    'minerals',
    'joules',
    'capacity',
    'distance',
    'voltage',
    'amps',
    'mass',
    'coulombs',
    'coulumbsPerSecons'
  ])
}
</script>

<style scoped>

</style>

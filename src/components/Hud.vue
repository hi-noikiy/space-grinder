<template>
    <div class='columns col-online hud'>
      <div title="Cell Voltage" class='column col-1'>{{voltage | exponentialize}}V</div>
      <div title="AmpHour Capacity" class='column col-1'>{{amps | exponentialize}}mAh</div>
      <div title="Energy" class='column col-1'>{{joules | exponentialize}}J</div>
      <div title="Charge Capacity" class='column col-2'>{{coulombs | exponentialize}}/{{capacity | exponentialize}}C</div>
      <div title="Charge Capacity" class='column col-2'>{{coulumbsPerSecons}}C/s</div>
      <div title="Mass of spaceship" class='column col-1'>{{mass | exponentialize}}kg</div>
      <div title="Approximate jump distance" class='column col-1 text-bold'>{{distance | exponentialize}}m</div>
      <div title="Minerals" class='column col-1'>{{minerals | exponentialize}}g</div>
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
    'joules',
    'distance',
    'voltage',
    'amps',
    'mass',
    'coulombs',
    'coulumbsPerSecons'
  ])
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>

</style>

<template>
    <div class='columns col-online'>
      <div title="Cell Voltage" class='column col-2'>{{this.$store.state.cellVoltage | exponentialize}} V</div>
      <div title="AmpHour Capacity" class='column col-2'>{{this.$store.state.ampHourCapacity | exponentialize}} mAh</div>
      <div title="Charge Capacity" class='column col-2'>{{this.$store.state.coulombs}}/{{capacity | exponentialize}} Coulombs</div>
      <div title="Energy" class='column col-2'>{{joules | exponentialize}} Joules</div>
      <div title="Mass of spaceship" class='column col-2'>{{this.$store.state.mass | exponentialize}} kg</div>
      <div title="Approximate jump distance" class='column col-2'>{{distance | exponentialize}} m</div>
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
    exponentialize: function (value) {
      var digits = 4
      //    console.log(`value ${value.toString().length} > ${digits} = ${value.toString().length > digits}`)
      if (value.toString().length > digits) {
        return value.toExponential(digits - 1)
      } else { return value }
    }
  },
  computed: mapGetters([
    'stardust',
    'joules',
    'capacity',
    'joules',
    'distance'
  ])
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
 div {
 }
</style>

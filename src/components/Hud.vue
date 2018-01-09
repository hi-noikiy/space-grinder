<template>
    <div class='columns col-online hud'>
      <div title="Cell Voltage" class='column col-1'>{{voltage | exponentialize}} V</div>
      <div title="AmpHour Capacity" class='column col-1'>{{amps | exponentialize}} mAh</div>
      <div title="Charge Capacity" class='column col-2'>{{this.$store.state.coulombs | exponentialize}}/{{capacity | exponentialize}} Coulombs</div>
      <div title="Energy" class='column col-2'>{{joules | exponentialize}} Joules</div>
      <div title="Mass of spaceship" class='column col-1'>{{mass | exponentialize}} kg</div>
      <div title="Approximate jump distance" class='column col-1'>{{distance | exponentialize}} m</div>
      <div title="Minerals" class='column col-1'>{{minerals | exponentialize}} kg</div>
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
    'minerals',
    'joules',
    'capacity',
    'joules',
    'distance',
    'voltage',
    'amps',
    'mass'
  ])
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
 .hud {
   border: 1px solid gray;
   background-color: rgb(235, 235, 235);
   padding: 4px;
   color:rgb(63, 63, 63);
 }
</style>

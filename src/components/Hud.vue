<template>
    <div class='columns'>
      <div title='Distance you can travel on next jump' class='column col-1'>{{this.$store.state.distance | exponentialize}} m</div>
      <div title='Speed' class='column col-1'>{{speed | exponentialize}} m/s</div>
      <div title='Mass' class='column col-1'>{{this.$store.state.mass | exponentialize}} Kg</div>
      <div title='Ampere' class='column col-1'>{{this.$store.state.amps | exponentialize}} MA</div>
      <div title='Ampere per second' class='column col-2'>{{ampsPerSecond | exponentialize}} MA/s</div>
      <div title='Volts' class='column col-1'>{{this.$store.state.volts | exponentialize}} V</div>
      <div title='Watts' class='column col-1'>{{watts | exponentialize}} W</div>
      <div title='Stardust' class='column col-1'>{{stardust | exponentialize}} g</div>
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
    'speed',
    'watts',
    'stardust',
    'ampsPerSecond'
  ])
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>

</style>

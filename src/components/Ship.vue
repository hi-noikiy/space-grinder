<template>
  <div id="main-window" class="container" v-on:click="screenClick">
    <div class="column col-12">{{ship_name}}</div>
    <Hud/>
    <ShipUpgradePanel/>
  </div>
</template>

<script>
import Hud from './Hud'
import ShipUpgradePanel from './ShipUpgradePanel'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Ship',
  data () {
    return {
      ship_name: 'A Spaceship',
      now: null,
      dt: null,
      last: this.timestamp(),
      updateFrequence: 1,
      screenClicks: 0
    }
  },
  components: {
    Hud,
    ShipUpgradePanel
  },
  computed: mapGetters(['speed']),
  methods: {
    ...mapActions([
      'incrementAmps',
      'incrementAmpsClick'
    ]),
    screenClick: function () {
      if (this.screenClicks++ < 30) { this.incrementAmpsClick(1) }
    },
    timestamp: function () {
      return window.performance && window.performance.now ? window.performance.now() : new Date().getTime()
    },
    frame: function () {
      setTimeout(function () {
        this.now = this.timestamp()
        this.dt = (this.now - this.last) / 1000   // duration in seconds
        this.update(this.dt)
        // render(this.dt)
        this.last = this.now
        requestAnimationFrame(this.frame)
      }.bind(this), 1000 / this.updateFrequence)
    },
    update: function (duration) {
      this.incrementAmps(0)
    }
  },
  created: function () {
    requestAnimationFrame(this.frame)
    setInterval(function () {
      this.screenClicks = 0
    }.bind(this), 1000)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#main-window {
    height: 100%;
    width: 100%;
}
</style>

<template>
  <div class="card">
    <div class="card-header">
      <div class="card-title h5">Scanner</div>
      <div class="card-subtitle text-gray text-small">There are {{objects}} unidentified objects in range</div>
    </div>
    <div class="card-image">
      <canvas ref="scannerCanvas" id="scannerCanvas" width="340" height="170" style="border:1px solid #d3d3d3;"/>
    </div>
    <div class="card-body">
    <div class="columns column col-12 action-panel">
      <div class="column ">
        <input type="number" />
      </div>
    </div>
  </div>

    <div class="card-footer">
    <button class="btn btn-primary" >Salvage</button>
    <button class="btn btn-primary" v-on:click="scan" >Scan</button>
  </div>
  </div>
</template>

<script>
export default {

  name: 'ScannerPanel',
  data () {
    return {
      objects: 0
    }
  },
  methods: {
    drawGrid: function () {
      let c = this.$refs.scannerCanvas // document.getElementById('scannerCanvas')
      let ctx = c.getContext('2d')
      ctx.fillStyle = '#1B1E23'
      ctx.fillRect(0, 0, c.width, c.height)

      for (let i = 0; i <= c.height; i += 10) {
        this.drawHLine(0, i, ctx, c)
      }
      for (let i = 0; i <= c.width; i += 10) {
        this.drawVLine(i, 0, ctx, c)
      }
      for (let i = -90; i <= 150; i += 15) {
        this.drawCurve(i, ctx, c)
      }
    },
    drawCurve: (inc, ctx, c) => {
      ctx.beginPath()
      ctx.moveTo(0 + inc, c.height)
      ctx.bezierCurveTo(20 + inc, -0.55 + inc, (c.width - 20) - inc, -0.55 + inc, c.width - inc, c.height)
      ctx.strokeStyle = '#4c5f61'
      ctx.stroke()
    },
    drawVLine: (x, y, ctx, c) => {
      ctx.beginPath()
      ctx.moveTo(x, y)
      ctx.lineTo(x, c.height)
      ctx.strokeStyle = '#4f4c61'
      ctx.stroke()
    },
    drawHLine: (x, y, ctx, c) => {
      ctx.beginPath()
      ctx.moveTo(x, y)
      ctx.lineTo(c.width, y)
      ctx.strokeStyle = '#4f4c61'
      ctx.stroke()
    },
    scan: function () {
      this.objects = Math.floor((Math.random() * 10000) + 1000)
    }
  },
  created: function () {
    // this.drawGrid()
    document.addEventListener('DOMContentLoaded', function (event) {
      this.drawGrid()
    }.bind(this))
  }
}
</script>

<style lang="scss" scoped>
  #scannerCanvas {
    width: 100% ;
    height: 170px;
    background-color: red;
  }
</style>


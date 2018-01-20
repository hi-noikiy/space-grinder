<template>
  <div class="off-canvas">
  <!-- off-screen toggle button -->
  <div class="col-12 centered">
    <a class="off-canvas-toggle btn btn-primary btn-action float-right" href="#ship-upgrade-panel">
    <i class="icon icon-upload"></i>
  </a>
  <a class="off-canvas-toggle btn btn-primary btn-action float-right" href="#crew-panel">
    <i class="icon icon-people"></i>
  </a>
  <a class="off-canvas-toggle btn btn-primary btn-action float-right" href="#scanner-panel">
    <i class="icon icon-search"></i>
  </a>
  </div>

  <div id="ship-upgrade-panel" class="off-canvas-sidebar">
    <!-- off-screen sidebar -->
    <ShipUpgradePanel/>
  </div>
  <div id="crew-panel" class="off-canvas-sidebar">
    <!-- off-screen sidebar -->
    <CrewPanel/>
  </div>
  <div id="scanner-panel" class="off-canvas-sidebar">
    <!-- off-screen sidebar -->
    <ScannerPanel/>
  </div>

  <a class="off-canvas-overlay" href="#close"></a>

  <div class="off-canvas-content">
    <!-- off-screen content -->
    off screen content
  </div>
</div>
</template><script>
import ShipUpgradePanel from './ShipUpgradePanel'
import CrewPanel from './CrewPanel'
import ScannerPanel from './ScannerPanel'
export default {
  name: 'MenuBar',
  data () {
    return {
    }
  },
  components: {
    ShipUpgradePanel,
    CrewPanel,
    ScannerPanel
  }
}
</script>

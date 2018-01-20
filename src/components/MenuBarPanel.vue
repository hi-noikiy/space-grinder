<template>
  <div class="off-canvas">
  <!-- off-screen toggle button -->
  <div class="col-12 centered">
    <a class="off-canvas-toggle btn btn-primary btn-action float-right" href="#ship-upgrade-panel">
    <font-awesome-icon :icon="['fas', 'chevron-square-up']" />
  </a>
  <a class="off-canvas-toggle btn btn-primary btn-action float-right" href="#crew-panel">
    <font-awesome-icon :icon="['fas', 'user']" />
  </a>
  <a class="off-canvas-toggle btn btn-primary btn-action float-right" href="#scanner-panel">
    <font-awesome-icon :icon="['fas', 'compass']" />
  </a>

  <a class="off-canvas-toggle btn btn-primary btn-action float-right" href="#research-panel">
    <font-awesome-icon :icon="['fas', 'flask']" />
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

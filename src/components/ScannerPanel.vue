<template>
  <div class="card">
    <div class="card-header">
      <div class="card-title h5">Scanner</div>
      <div class="card-subtitle text-gray text-small">There are 0 unidentified objects within scanner range</div>
    </div>
    <div class="card-image">
      <img :src="radar" class="img-responsive">
    </div>
    <div class="card-body">
    <div class="columns column col-12 action-panel">
      <div class="column ">
        <input type="number" />
      </div>
    </div>
  </div>

    <div class="card-footer">
    <button class="btn btn-primary" >Send</button>
    <button class="btn btn-primary" >Scan</button>
  </div>
  </div>
</template>

<script>
import radar from './../assets/images/temporary_radar.jpg'
export default {

  name: 'ScannerPanel',
  data () {
    return {
      radar: radar
    }
  }
}
</script>

<style lang="scss" scoped>
  .radar {
    height: 200px;
    background-color: red;
  }
</style>


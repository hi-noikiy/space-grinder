<template>
  <div id="app">
    <Ship/>
  </div>
</template>

<script>
import Ship from './components/Ship'

export default {
  name: 'app',
  components: {
    Ship
  }
}
</script>

<style>
html, body, #app {
    height: 100%;
    width: 100%;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
</style>

/**
 * Import Global Style (.css/.scss)
 */
import './assets/scss/index.scss'

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'

// import utility from './store/utility'

Vue.filter('exponentialize', function (value) {
  if (value === undefined) return 'udef'
  var digits = 6
  // value = utility.methods.roundTo(value, 2)
  value = Number(value.toFixed(3))
  if ((value + '').replace('.', '').length > digits && !isNaN(value)) {
    return value.toExponential(digits - 1)
  } else { return value }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  template: '<App/>',
  components: { App }
})

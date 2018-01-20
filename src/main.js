/**
 * Import Global Style (.css/.scss)
 */
import './assets/scss/index.scss'

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
/**
 * Import Font Awesome
 */
import fontawesome from '@fortawesome/fontawesome'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import solid from '@fortawesome/fontawesome-pro-solid'
fontawesome.library.add(solid) // Use any icon from the Solid style

Vue.component('font-awesome-icon', FontAwesomeIcon) // Use the icon component anywhere in the app

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

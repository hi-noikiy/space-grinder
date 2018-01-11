import Vue from 'vue'
import Vuex from 'vuex'
import crew from './modules/crew'
import ship from './modules/ship'
import upgrades from './modules/upgrades'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    crew,
    ship,
    upgrades
  }
})

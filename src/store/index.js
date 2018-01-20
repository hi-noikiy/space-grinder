import Vue from 'vue'
import Vuex from 'vuex'
import crew from './modules/crew'
import ship from './modules/ship'
import upgrades from './modules/upgrades'
import liquidgas from './modules/liquidgas'
import research from './modules/research'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    crew,
    ship,
    upgrades,
    liquidgas,
    research
  }
})

// import Vue from 'vue'
// import Vuex from 'vuex'
import * as types from '../mutation-types'
import upgrades from './upgrades'

// Vue.use(Vuex)

const state = {
  distance: 0,
  cellVoltage: 2,
  cvMultiplier: 0,
  ampHourCapacity: 2,
  ahcMultiplier: 0,
  coulombs: 7000,
  columobsMultiplier: 100,
  mass: 200000,
  minerals: 100000,
  jumps: 0,
  accumulatedDistance: 0,
  baseMassIncrease: 1000,
  upgradeTiers: [10, 100, 1000, 2500, 5000, 10000]
}

var addCoulombs = function (state, amount) {
  if (state.coulombs + amount < state.ampHourCapacity * 3600) {
    state.coulombs += amount
  } else { state.columbs = state.ampHourCapacity * 3600 }

  if (state.coulombs > 500) {
    state.minerals += (amount / 4)
  }
}

const mutations = {
  [types.INCREMENT_COULOMBS] (state, {amount}) {
    addCoulombs(state, getters.coulumbsPerSecons(state))
  },
  [types.INCREMENT_COULOMBS_CLICK] (state, {amount}) {
    addCoulombs(state, amount)
  },
  [types.INCREMENT_VOLTS] (state, {amount}) {
    state.cellVoltage += amount
  },
  [types.INCREMENT_AMPS] (state, {amount}) {
    state.ampHourCapacity += amount
  },
  [types.INCREMENT_MASS] (state, {amount}) {
    state.mass += amount
  },
  [types.DECREMENT_MASS] (state, {amount}) {
    state.mass -= amount
  },
  [types.INCREMENT_MINERALS] (state, {amount}) {
    state.minerals += amount
  },
  [types.DECREMENT_MINERALS] (state, {amount}) {
    state.minerals -= amount
  }
}

const actions = {
  incrementCoulombs: ({ commit }, amount) => commit(types.INCREMENT_COULOMBS, {amount: amount}),
  incrementCoulombsClick: ({ commit }, amount) => commit(types.INCREMENT_COULOMBS_CLICK, {amount: amount}),
  incrementVolts: ({ commit }, amount) => commit(types.INCREMENT_VOLTS, {amount: amount}),
  incrementAmps: ({ commit }, amount) => commit(types.INCREMENT_AMPS, {amount: amount}),
  incrementMass: ({ commit }, amount) => commit(types.INCREMENT_MASS, {amount: amount}),
  decrementMass: ({ commit }, amount) => commit(types.DECREMENT_MASS, {amount: amount}),
  decrementMinerals: ({ commit }, amount) => commit(types.DECREMENT_MINERALS, {amount: amount})
}

const getters = {
  minerals: state => state.minerals,
  capacity: state => state.ampHourCapacity * 3600,
  coulombs: state => state.coulombs,
  joules: state => state.cellVoltage * state.coulombs,
  distance: state => (state.cellVoltage * state.coulombs) / state.mass,
  coulumbsPerSecons: state => {
    return upgrades.state.upgrades.filter((upg) => upg.category === 1).reduce((sum, upg) => { return sum + (upg.baseProd * upg.upgCount * upg.level) }, 0)
  },
  voltage: state => {
    upgrades.state.upgrades.filter((upg) => upg.category === 2).map(u => { state.cellVoltage += u.voltIncrease * u.upgCount })
    return state.cellVoltage
  },
  amps: state => {
    upgrades.state.upgrades.filter((upg) => upg.category === 2).map(u => { state.ampHourCapacity += u.ampIncrease * u.upgCount })
    return state.ampHourCapacity
  },
  mass: state => {
    upgrades.state.upgrades.filter((upg) => upg.category === 3).map(u => { state.mass -= u.massReduction * u.upgCount })
    return state.mass
  },
  upgradeTiers: state => state.upgradeTiers
}

export default {
  state,
  getters,
  actions,
  mutations
}

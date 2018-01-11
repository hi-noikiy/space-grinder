import Vue from 'vue'
import Vuex from 'vuex'
import * as types from '../mutation-types'
import upgrades from './upgrades'

Vue.use(Vuex)

const state = {
  distance: 0,
  cellVoltage: 2,
  cvMultiplier: 0,
  ampHourCapacity: 2,
  ahcMultiplier: 0,
  coulombs: 0,
  mass: 200000,
  minerals: 100
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
    upgrades.state.generatorUpgrades.map(u => { amount += (u.baseProd * u.upgCount * u.level) })
    addCoulombs(state, amount)
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
  distance: state => Math.tanh((state.cellVoltage * state.coulombs) / state.mass),
  voltage: state => {
    // upgrades.storageUpgrades.map(u => { state.cellVoltage += u.voltIncrease * u.upgCount })
    return state.cellVoltage
  },
  amps: state => {
    // upgrades.storageUpgrades.map(u => { state.ampHourCapacity += u.ampIncrease * u.upgCount })
    return state.ampHourCapacity
  },
  mass: state => {
    // upgrades.hullUpgrades.map(u => { state.mass -= u.massReduction * u.upgCount })
    return state.mass
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

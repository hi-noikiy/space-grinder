// import Vue from 'vue'
// import Vuex from 'vuex'
import * as types from '../mutation-types'
import upgrades from './upgrades'
import crew from './crew'

// Vue.use(Vuex)

const state = {
  distance: 0,
  cellVoltage: 2,
  cvMultiplier: 0,
  ampHourCapacity: 2,
  ahcMultiplier: 0,
  coulombs: 7000,
  cps: 0,
  columobsMultiplier: 100,
  mass: 200000,
  minerals: 100000,
  jumps: 0,
  accumulatedDistance: 0,
  baseMassIncrease: 1000,
  upgradeTiers: [10, 100, 1000, 2500, 5000, 10000]
}

const _addCoulombs = function (state, amount) {
  var capacity = state.ampHourCapacity * 3600
  if (state.coulombs + amount < capacity) {
    state.coulombs += amount
    _addMinerals(amount / 4)
  } else {
    state.coulombs = capacity
    _addMinerals(amount / 2)
  }
}

const _addMinerals = function (state, amount) {
  if (state.coulombs > 500) {
    let crewBonus = crew.state.crew.filter((member) => member.stats !== undefined).reduce((sum, mbr) => { return sum + mbr.stats.mineralIncrease }, 0)
    crewBonus = crewBonus / 100 + 1
    state.minerals += amount * crewBonus
  }
}

const mutations = {
  // Gather all bonuses and total production and add it to coulomb sum
  [types.INCREMENT_COULOMBS] (state, {amount}) {
    _addCoulombs(state, getters.coulumbsPerSecons(state))
  },
  [types.INCREMENT_COULOMBS_CLICK] (state, {amount}) {
    _addCoulombs(state, amount)
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
    let crewBonus = crew.state.crew.filter((member) => member.stats !== undefined).reduce((sum, mbr) => { return sum + mbr.stats.coulombIncrease }, 0)
    crewBonus = crewBonus / 100 + 1
    let baseProd = upgrades.state.upgrades.filter((upg) => upg.category === 1).reduce((sum, upg) => { return sum + ((upg.baseProd * upg.upgCount * upg.level)) }, 0)
    state.cps = baseProd * crewBonus
    return state.cps
  },
  voltage: state => {
    // get base voltage from upgrades
    upgrades.state.upgrades.filter((upg) => upg.category === 2).map(u => { state.cellVoltage += u.voltIncrease * u.upgCount })
    // get bonus from crew
    let crewBonus = crew.state.crew.filter((member) => member.stats !== undefined).reduce((sum, mbr) => { return sum + mbr.stats.voltIncrease }, 0)
    crewBonus = crewBonus / 100 + 1
    state.cellVoltage = state.cellVoltage * crewBonus
    console.log(state.cellVoltage)
    return state.cellVoltage
  },
  amps: state => {
    // get base amps from upgrades
    upgrades.state.upgrades.filter((upg) => upg.category === 2).map(u => { state.ampHourCapacity += u.ampIncrease * u.upgCount })
    // get bonus from crew
    let crewBonus = crew.state.crew.filter((member) => member.stats !== undefined).reduce((sum, mbr) => { return sum + mbr.stats.ampIncrease }, 0)
    crewBonus = crewBonus / 100 + 1
    state.ampHourCapacity = state.ampHourCapacity * crewBonus
    return state.ampHourCapacity
  },
  mass: state => {
    // get base mass from upgrades
    upgrades.state.upgrades.filter((upg) => upg.category === 3).map(u => { state.mass -= u.massReduction * u.upgCount })
    // get bonus from crew
    let crewBonus = crew.state.crew.filter((member) => member.stats !== undefined).reduce((sum, mbr) => { return sum + mbr.stats.massDecrease }, 0)
    crewBonus = crewBonus / 100 + 1
    state.mass = state.mass * crewBonus
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

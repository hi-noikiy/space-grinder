import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  distance: 0,
  cellVoltage: 2,
  cvMultiplier: 0,
  ampHourCapacity: 2,
  ahcMultiplier: 0,
  coulombs: 0,
  mass: 200000,
  stardust: 100000,
  generatorUpgrades: [
    {id: 1, name: 'gen upg 1', baseCost: 10, upgCount: 1, baseProd: 2},
    {id: 2, name: 'gen upg 2', baseCost: 125, upgCount: 0, baseProd: 6},
    {id: 3, name: 'gen upg 3', baseCost: 600, upgCount: 0, baseProd: 20},
    {id: 4, name: 'gen upg 4', baseCost: 1800, upgCount: 0, baseProd: 65}
  ],
  storageUpgrades: [
    {id: 1, name: 'stor upg 1', baseCost: 10 * 10, upgCount: 1, baseProd: 2 * 10},
    {id: 2, name: 'stor upg 2', baseCost: 125 * 10, upgCount: 0, baseProd: 6 * 10},
    {id: 3, name: 'stor upg 3', baseCost: 600 * 10, upgCount: 0, baseProd: 20 * 10},
    {id: 4, name: 'stor upg 4', baseCost: 1800 * 10, upgCount: 0, baseProd: 65 * 10}
  ],
  hullUpgrades: [
    {id: 1, name: 'hull upg 1', baseCost: 10 * 100, upgCount: 1, baseProd: 2 * 100},
    {id: 2, name: 'hull upg 2', baseCost: 125 * 100, upgCount: 0, baseProd: 6 * 100},
    {id: 3, name: 'hull upg 3', baseCost: 600 * 100, upgCount: 0, baseProd: 20 * 100},
    {id: 4, name: 'hull upg 4', baseCost: 1800 * 100, upgCount: 0, baseProd: 65 * 100}
  ]
}

var addCoulombs = function (state, amount) {
  if (state.coulombs + amount < state.ampHourCapacity * 3600) {
    state.coulombs += amount
  } else { state.columbs = state.ampHourCapacity * 3600 }

  if (state.coulombs > 500) {
    state.stardust += (amount / 4)
  }
}

const mutations = {
  incrementCoulombs (state, {amount}) {
    state.generatorUpgrades.map(u => { amount += u.baseProd * u.upgCount })
    addCoulombs(state, amount)
  },
  incrementCoulombsClick (state, {amount}) {
    addCoulombs(state, amount)
  },
  incrementVolts (state, {amount}) {
    state.cellVoltage += amount
  },
  incrementAmps (state, {amount}) {
    state.ampHourCapacity += amount
  },
  incrementMass (state, {amount}) {
    state.mass += amount
  },
  decrementMass (state, {amount}) {
    state.mass -= amount
  },
  incrementStarDust (state, {amount}) {
    state.stardust += amount
  },
  decrementStarDust (state, {amount}) {
    state.stardust -= amount
  },
  buyUpgrade (state, {id}) {
    state.upgrades.map((upg) => {
      if (upg.id === id && upg.baseCost * Math.pow(1.15, upg.upgCount) < state.stardust) {
        state.stardust -= upg.baseCost * Math.pow(1.15, upg.upgCount)
        upg.upgCount++
      }
    })
  }
}

const actions = {
  incrementCoulombs: ({ commit }, amount) => commit('incrementCoulombs', {amount: amount}),
  incrementCoulombsClick: ({ commit }, amount) => commit('incrementCoulombsClick', {amount: amount}),
  incrementVolts: ({ commit }, amount) => commit('incrementVolts', {amount: amount}),
  incrementMass: ({ commit }, amount) => commit('incrementMass', {amount: amount}),
  decrementMass: ({ commit }, amount) => commit('decrementMass', {amount: amount}),
  buyUpgrade: ({ commit }, id) => commit('buyUpgrade', {id: id})
}

const getters = {
  // speed: state => Math.sqrt((2 * ((state.amps / 1000) * state.volts)) / state.mass),
  // watts: state => (state.amps / 1000) * state.volts,
  generatorUpgrades: state => state.generatorUpgrades,
  storageUpgrades: state => state.storageUpgrades,
  hullUpgrades: state => state.hullUpgrades,
  stardust: state => state.stardust,
  capacity: state => state.ampHourCapacity * 3600,
  joules: state => state.cellVoltage * state.coulombs,
  distance: state => Math.tanh((state.cellVoltage * state.coulombs) / state.mass)
  // ampsPerSecond: state => state.upgrades.reduce((a, b) => a + (b.baseProd * b.upgCount), 0)
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})

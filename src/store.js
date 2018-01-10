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
  minerals: 100000,
  crew: [
    {id: 0, image: './assets/images/head.png'},
    {id: 1, image: '../assets/images/head2.png'},
    {id: 2, image: '../assets/images/head.png'},
    {id: 3, image: '../assets/images/head.png'},
    {id: 4, image: '../assets/images/head.png'}
  ],
  generatorUpgrades: [
    {id: 1, name: 'gen upg 1', baseCost: 10, upgCount: 0, baseProd: 2},
    {id: 2, name: 'gen upg 2', baseCost: 125, upgCount: 0, baseProd: 6},
    {id: 3, name: 'gen upg 3', baseCost: 600, upgCount: 0, baseProd: 20},
    {id: 4, name: 'gen upg 4', baseCost: 1800, upgCount: 0, baseProd: 65}
  ],
  storageUpgrades: [
    {id: 1, name: 'stor upg 1', baseCost: 10 * 10, upgCount: 0, voltIncrease: 2, ampIncrease: 2},
    {id: 2, name: 'stor upg 2', baseCost: 125 * 10, upgCount: 0, voltIncrease: 6, ampIncrease: 6},
    {id: 3, name: 'stor upg 3', baseCost: 600 * 10, upgCount: 0, voltIncrease: 20, ampIncrease: 20},
    {id: 4, name: 'stor upg 4', baseCost: 1800 * 10, upgCount: 0, voltIncrease: 65, ampIncrease: 65}
  ],
  hullUpgrades: [
    {id: 1, name: 'hull upg 1', baseCost: 10 * 100, upgCount: 0, massReduction: 20},
    {id: 2, name: 'hull upg 2', baseCost: 125 * 100, upgCount: 0, massReduction: 60},
    {id: 3, name: 'hull upg 3', baseCost: 600 * 100, upgCount: 0, massReduction: 200},
    {id: 4, name: 'hull upg 4', baseCost: 1800 * 100, upgCount: 0, massReduction: 650}
  ]
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
  incrementMinerals (state, {amount}) {
    state.minerals += amount
  },
  decrementMinerals (state, {amount}) {
    state.minerals -= amount
  },
  buyGeneratorUpgrades (state, {id}) {
    console.log('buyGeneratorUpgrades')
    state.generatorUpgrades.map((upg) => {
      if (upg.id === id && upg.baseCost * Math.pow(1.15, upg.upgCount) < state.minerals) {
        state.minerals -= upg.baseCost * Math.pow(1.15, upg.upgCount)
        upg.upgCount++
      }
    })
  },
  buyStorageUpgrades (state, {id}) {
    console.log('buyStorageUpgrades')
    state.storageUpgrades.map((upg) => {
      if (upg.id === id && upg.baseCost * Math.pow(1.15, upg.upgCount) < state.minerals) {
        state.minerals -= upg.baseCost * Math.pow(1.15, upg.upgCount)
        upg.upgCount++
      }
    })
  },
  buyHullUpgrades (state, {id}) {
    console.log('buyHullUpgrades')
    state.hullUpgrades.map((upg) => {
      if (upg.id === id && upg.baseCost * Math.pow(1.15, upg.upgCount) < state.minerals) {
        state.minerals -= upg.baseCost * Math.pow(1.15, upg.upgCount)
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
  buyGeneratorUpgrades: ({ commit }, id) => commit('buyGeneratorUpgrades', {id: id}),
  buyStorageUpgrades: ({ commit }, id) => commit('buyStorageUpgrades', {id: id}),
  buyHullUpgrades: ({ commit }, id) => commit('buyHullUpgrades', {id: id})
}

const getters = {
  generatorUpgrades: state => state.generatorUpgrades,
  storageUpgrades: state => state.storageUpgrades,
  hullUpgrades: state => state.hullUpgrades,
  minerals: state => state.minerals,
  capacity: state => state.ampHourCapacity * 3600,
  joules: state => state.cellVoltage * state.coulombs,
  distance: state => Math.tanh((state.cellVoltage * state.coulombs) / state.mass),
  voltage: state => {
    state.storageUpgrades.map(u => { state.cellVoltage += u.voltIncrease * u.upgCount })
    return state.cellVoltage
  },
  amps: state => {
    state.storageUpgrades.map(u => { state.ampHourCapacity += u.ampIncrease * u.upgCount })
    return state.ampHourCapacity
  },
  mass: state => {
    state.hullUpgrades.map(u => { state.mass -= u.massReduction * u.upgCount })
    return state.mass
  },
  crew: state => state.crew
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})

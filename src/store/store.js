import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './mutation-types'
import VuexPersist from 'vuex-persist'

Vue.use(Vuex)

const vuexLocalStorage = new VuexPersist({
  key: 'vuex', // The key to store the state on in the storage provider.
  storage: window.localStorage // or window.sessionStorage or localForage
  // Function that passes the state and returns the state with only the objects you want to store.
  // reducer: state => state,
  // Function that passes a mutation and lets you decide if it should update the state in localStorage.
  // filter: mutation => (true)
})

const state = {
  distance: 0,
  cellVoltage: 2,
  cvMultiplier: 0,
  ampHourCapacity: 2,
  ahcMultiplier: 0,
  coulombs: 0,
  mass: 200000,
  minerals: 100,
  crew: [
    {id: 10, image: 'def', desc: 'select a crewmember', name: 'Select member'},
    {id: 11, image: 'def', desc: 'select a crewmember, unlocks at ?', name: 'Select member'},
    {id: 12, image: 'def', desc: 'select a crewmember, unlocks at ?', name: 'Select member'},
    {id: 13, image: 'def', desc: 'select a crewmember, unlocks at ?', name: 'Select member'},
    {id: 14, image: 'def', desc: 'select a crewmember, unlocks at ?', name: 'Select member'}
  ],
  availableCrew: [
    {id: 20, image: 'av1', selected: false, desc: 'this is a description of the selected crewmember', name: 'Crewmember 1', prof: 'Mechanic'},
    {id: 21, image: 'av2', selected: false, desc: 'this is a description of the selected crewmember', name: 'Crewmember 1', prof: 'Soldier'},
    {id: 22, image: 'av3', selected: false, desc: 'this is a description of the selected crewmember', name: 'Crewmember 1', prof: 'Botanist'},
    {id: 23, image: 'av4', selected: false, desc: 'this is a description of the selected crewmember', name: 'Crewmember 1', prof: 'Physicist '},
    {id: 24, image: 'av5', selected: false, desc: 'this is a description of the selected crewmember', name: 'Crewmember 1', prof: 'Deadbeat'}
  ],
  generatorUpgrades: [
    {id: 1, name: 'gen upg 1', baseCost: 10, upgCount: 0, baseProd: 2, level: 1},
    {id: 2, name: 'gen upg 2', baseCost: 125, upgCount: 0, baseProd: 6, level: 1},
    {id: 3, name: 'gen upg 3', baseCost: 600, upgCount: 0, baseProd: 20, level: 1},
    {id: 4, name: 'gen upg 4', baseCost: 1800, upgCount: 0, baseProd: 65, level: 1}
  ],
  storageUpgrades: [
    {id: 1, name: 'stor upg 1', baseCost: 10 * 10, upgCount: 0, voltIncrease: 2, ampIncrease: 2, level: 1},
    {id: 2, name: 'stor upg 2', baseCost: 125 * 10, upgCount: 0, voltIncrease: 6, ampIncrease: 6, level: 1},
    {id: 3, name: 'stor upg 3', baseCost: 600 * 10, upgCount: 0, voltIncrease: 20, ampIncrease: 20, level: 1},
    {id: 4, name: 'stor upg 4', baseCost: 1800 * 10, upgCount: 0, voltIncrease: 65, ampIncrease: 65, level: 1}
  ],
  hullUpgrades: [
    {id: 1, name: 'hull upg 1', baseCost: 10 * 100, upgCount: 0, massReduction: 20, level: 1},
    {id: 2, name: 'hull upg 2', baseCost: 125 * 100, upgCount: 0, massReduction: 60, level: 1},
    {id: 3, name: 'hull upg 3', baseCost: 600 * 100, upgCount: 0, massReduction: 200, level: 1},
    {id: 4, name: 'hull upg 4', baseCost: 1800 * 100, upgCount: 0, massReduction: 650, level: 1}
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
  [types.INCREMENT_COULOMBS] (state, {amount}) {
    state.generatorUpgrades.map(u => { amount += (u.baseProd * u.upgCount * u.level) })
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
  },
  [types.BUY_GENERATOR_UPGRADES] (state, {id}) {
    // console.log('buyGeneratorUpgrades')
    state.generatorUpgrades.map((upg) => {
      if (upg.id === id && upg.baseCost * Math.pow(1.15, upg.upgCount) < state.minerals) {
        state.minerals -= upg.baseCost * Math.pow(1.15, upg.upgCount)
        upg.upgCount++
      }
    })
  },
  [types.BUY_STORAGE_UPGRADES] (state, {id}) {
    // console.log('buyStorageUpgrades')
    state.storageUpgrades.map((upg) => {
      if (upg.id === id && upg.baseCost * Math.pow(1.15, upg.upgCount) < state.minerals) {
        state.minerals -= upg.baseCost * Math.pow(1.15, upg.upgCount)
        upg.upgCount++
      }
    })
  },
  [types.BUY_HULL_UPGRADES] (state, {id}) {
    // console.log('buyHullUpgrades')
    state.hullUpgrades.map((upg) => {
      if (upg.id === id && upg.baseCost * Math.pow(1.15, upg.upgCount) < state.minerals) {
        state.minerals -= upg.baseCost * Math.pow(1.15, upg.upgCount)
        upg.upgCount++
      }
    })
  },
  [types.ASSIGN_CREWMEMBER] (state, {slotIdCrewId}) {
    console.log(slotIdCrewId['slotId'])
    console.log(slotIdCrewId['crewId'])
    if (!state.availableCrew[slotIdCrewId['crewId']].selected) {
      state.crew[slotIdCrewId['slotId']] = state.availableCrew[slotIdCrewId['crewId']]
      state.availableCrew[slotIdCrewId['crewId']].selected = true
    }
  }
}

const actions = {
  incrementCoulombs: ({ commit }, amount) => commit(types.INCREMENT_COULOMBS, {amount: amount}),
  incrementCoulombsClick: ({ commit }, amount) => commit(types.INCREMENT_COULOMBS_CLICK, {amount: amount}),
  incrementVolts: ({ commit }, amount) => commit(types.INCREMENT_VOLTS, {amount: amount}),
  incrementMass: ({ commit }, amount) => commit(types.INCREMENT_MASS, {amount: amount}),
  decrementMass: ({ commit }, amount) => commit(types.DECREMENT_MASS, {amount: amount}),
  buyGeneratorUpgrades: ({ commit }, id) => commit(types.BUY_GENERATOR_UPGRADES, {id: id}),
  buyStorageUpgrades: ({ commit }, id) => commit(types.BUY_STORAGE_UPGRADES, {id: id}),
  buyHullUpgrades: ({ commit }, id) => commit(types.BUY_HULL_UPGRADES, {id: id}),
  assignCrewMember: ({ commit }, slotIdCrewId) => commit(types.ASSIGN_CREWMEMBER, {slotIdCrewId: slotIdCrewId})
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
  crew: state => state.crew,
  availableCrew: state => state.availableCrew
}

export default new Vuex.Store({
  plugins: [vuexLocalStorage.plugin],
  state,
  getters,
  actions,
  mutations
})

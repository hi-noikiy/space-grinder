import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  distance: 0,
  amps: 5000,
  volts: 12,
  mass: 200000,
  stardust: 100000,
  upgrades: [
    {id: 1, name: 'Extra Capacitors', baseCost: 10, upgCount: 0, baseProd: 2},
    {id: 2, name: 'Solar Panels', baseCost: 125, upgCount: 0, baseProd: 6},
    {id: 3, name: 'Batteries', baseCost: 600, upgCount: 0, baseProd: 20},
    {id: 4, name: 'Improved Wires', baseCost: 1800, upgCount: 0, baseProd: 65},
    {id: 5, name: 'Improved Capacitors', baseCost: 5600, upgCount: 0, baseProd: 200},
    {id: 6, name: 'Cooling Modules', baseCost: 38000, upgCount: 0, baseProd: 650},
    {id: 7, name: 'Carbon Fiber Platings', baseCost: 442000, upgCount: 0, baseProd: 2000},
    {id: 8, name: 'Temperature Controllers', baseCost: 7300000, upgCount: 0, baseProd: 8500},
    {id: 9, name: 'Guidance Modules', baseCost: 145000000, upgCount: 0, baseProd: 100000},
    {id: 10, name: 'Fiber Optics', baseCost: 3200000000, upgCount: 0, baseProd: 1200000},
    {id: 11, name: 'Annoying People', baseCost: 200000000000, upgCount: 0, baseProd: 2500000}
  ]
}

const mutations = {
  incrementDistance (state, {amount}) {
    state.distance += amount
  },
  decrementDistance (state, {amount}) {
    state.distance -= amount
  },
  incrementAmps (state, {amount}) {
    state.upgrades.map(u => { amount += u.baseProd * u.upgCount })
    state.amps += amount
    if (state.apms > 500) {
      console.log(amount)
      state.stardust += (amount / 4)
    }
  },
  incrementAmpsClick (state, {amount}) {
    state.amps += amount
    if (state.apms > 500) {
      state.stardust += (amount / 4)
    }
  },
  decrementAmps (state, {amount}) {
    state.amps -= amount
  },
  incrementVolts (state, {amount}) {
    state.volts += amount
  },
  decrementVolts (state, {amount}) {
    state.volts -= amount
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
  incrementDistance: ({ commit }, amount) => commit('incrementDistance', {amount: amount}),
  decrementDistance: ({ commit }, amount) => commit('decrementDistance', {amount: amount}),
  incrementAmps: ({ commit }, amount) => commit('incrementAmps', {amount: amount}),
  incrementAmpsClick: ({ commit }, amount) => commit('incrementAmpsClick', {amount: amount}),
  decrementAmps: ({ commit }, amount) => commit('decrementAmps', {amount: amount}),
  incrementVolts: ({ commit }, amount) => commit('incrementVolts', {amount: amount}),
  decrementVolts: ({ commit }, amount) => commit('decrementVolts', {amount: amount}),
  incrementMass: ({ commit }, amount) => commit('incrementMass', {amount: amount}),
  decrementMass: ({ commit }, amount) => commit('decrementMass', {amount: amount}),
  buyUpgrade: ({ commit }, id) => commit('buyUpgrade', {id: id})
}

const getters = {
  speed: state => Math.sqrt((2 * ((state.amps / 1000) * state.volts)) / state.mass),
  watts: state => (state.amps / 1000) * state.volts,
  upgrades: state => state.upgrades,
  stardust: state => state.stardust,
  // ampsPerSecond: state => state.upgrades.reduce((a, upg) => ({sum: a.sum + (upg.baseProd * upg.upgCount)}))
  ampsPerSecond: state => state.upgrades.reduce((a, b) => a + (b.baseProd * b.upgCount), 0)
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})

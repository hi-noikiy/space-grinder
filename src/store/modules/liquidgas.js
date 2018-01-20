import * as types from '../mutation-types'

const state = {
  hydrogen: 33,
  oxygen: 66,
  carbon: 99,
  hydrogenCapacity: 100,
  oxygenCapacity: 100,
  carbonCapacity: 100
}
const mutations = {
  [types.INCREMENT_HYDROGEN] (state, {amount}) {
    state.hydrogen += amount
  },
  [types.INCREMENT_OXYGEN] (state, {amount}) {
    state.oxygen += amount
  },
  [types.INCREMENT_CARBON] (state, {amount}) {
    state.carbon += amount
  },
  [types.DECREMENT_HYDROGEN] (state, {amount}) {
    state.hydrogen -= amount
  },
  [types.DECREMENT_OXYGEN] (state, {amount}) {
    state.oxygen -= amount
  },
  [types.DECREMENT_CARBON] (state, {amount}) {
    state.carbon -= amount
  }
}

const actions = {
  decrementHydrogen: ({ commit }, amount) => commit(types.DECREMENT_HYDROGEN, {amount: amount}),
  decrementOxygen: ({ commit }, amount) => commit(types.DECREMENT_OXYGEN, {amount: amount}),
  decrementCarbon: ({ commit }, amount) => commit(types.DECREMENT_CARBON, {amount: amount}),
  incrementHydrogen: ({ commit }, amount) => commit(types.INCREMENT_HYDROGEN, {amount: amount}),
  incrementOxygen: ({ commit }, amount) => commit(types.INCREMENT_OXYGEN, {amount: amount}),
  incrementCarbon: ({ commit }, amount) => commit(types.INCREMENT_CARBON, {amount: amount})
}

const getters = {
  hydrogen: state => state.hydrogen,
  oxygen: state => state.oxygen,
  carbon: state => state.carbon,
  hydrogenCapacity: state => state.hydrogenCapacity,
  oxygenCapacity: state => state.oxygenCapacity,
  carbonCapacity: state => state.carbonCapacity
}

export default {
  state,
  getters,
  actions,
  mutations
}

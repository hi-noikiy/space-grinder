import * as types from '../mutation-types'

const state = {
  hydrogen: 33,
  oxygen: 66,
  carbon: 99
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

// decrementMinerals: ({ commit }, amount) => commit(types.DECREMENT_MINERALS, {amount: amount})
const actions = {
  decrementHydrogen: ({ commit }, amount) => commit(types.DECREMENT_HYDROGEN, {amount: amount}),
  decrementOxygen: ({ commit }, amount) => commit(types.DECREMENT_OXYGEN, {amount: amount}),
  decrementCarbon: ({ commit }, amount) => commit(types.DECREMENT_CARBON, {amount: amount}),
  incrementHydrogen: ({ commit }, amount) => commit(types.INCREMENT_HYDROGEN, {amount: amount}),
  incrementOxygen: ({ commit }, amount) => commit(types.INCREMENT_OXYGEN, {amount: amount}),
  incrementCarbon: ({ commit }, amount) => commit(types.INCREMENT_CARBON, {amount: amount})
}

const getters = {}

export default {
  state,
  getters,
  actions,
  mutations
}

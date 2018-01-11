import Vue from 'vue'
import Vuex from 'vuex'
import * as types from '../mutation-types'
import ship from './ship'

Vue.use(Vuex)

const state = {
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

const mutations = {
  [types.BUY_GENERATOR_UPGRADES] (state, {id}) {
    var upg = state.generatorUpgrades.find((upg) => upg.id === id)
    if (ship.state.minerals > upg.baseCost * Math.pow(1.15, upg.upgCount)) {
      ship.state.minerals -= upg.baseCost * Math.pow(1.15, upg.upgCount)
      upg.upgCount++
    }
  },
  [types.BUY_STORAGE_UPGRADES] (state, {id}) {
    var upg = state.storageUpgrades.find((upg) => upg.id === id)
    if (ship.state.minerals > upg.baseCost * Math.pow(1.15, upg.upgCount)) {
      ship.state.minerals -= upg.baseCost * Math.pow(1.15, upg.upgCount)
      ship.state.ampHourCapacity += upg.ampIncrease
      ship.state.cellVoltage += upg.voltIncrease
      upg.upgCount++
    }
  },
  [types.BUY_HULL_UPGRADES] (state, {id}) {
    var upg = state.hullUpgrades.find((upg) => upg.id === id)
    if (ship.state.minerals > upg.baseCost * Math.pow(1.15, upg.upgCount)) {
      ship.state.minerals -= upg.baseCost * Math.pow(1.15, upg.upgCount)
      upg.upgCount++
    }
  }
}

const actions = {
  buyGeneratorUpgrades: ({ commit }, id) => commit(types.BUY_GENERATOR_UPGRADES, {id: id}),
  buyStorageUpgrades: ({ commit }, id) => commit(types.BUY_STORAGE_UPGRADES, {id: id}),
  buyHullUpgrades: ({ commit }, id) => commit(types.BUY_HULL_UPGRADES, {id: id})
}

const getters = {
  generatorUpgrades: state => state.generatorUpgrades,
  storageUpgrades: state => state.storageUpgrades,
  hullUpgrades: state => state.hullUpgrades
}

export default {
  state,
  getters,
  actions,
  mutations
}

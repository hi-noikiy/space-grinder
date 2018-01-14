// import Vue from 'vue'
// import Vuex from 'vuex'
import * as types from '../mutation-types'
import ship from './ship'

class Upgrade {
  constructor (category, id, name, baseCost) {
    this.category = category
    this.id = id
    this.name = name
    this.baseCost = baseCost
    this.upgCount = 0
    this.level = 1
  }
}

class GeneratorUpgrade extends Upgrade {
  constructor (category, id, name, baseCost, baseProd, massIncrease) {
    super(category, id, name, baseCost)
    this.massIncrease = 100 / 4 * massIncrease
    this.baseProd = baseProd
  }
  get prod () {
    return this.baseProd * this.upgCount * this.level
  }
}

class CapacityUpgrade extends Upgrade {
  constructor (category, id, name, baseCost, massIncrease, voltIncrease, ampIncrease) {
    super(category, id, name, baseCost)
    this.massIncrease = 100 / 4 * massIncrease
    this.voltIncrease = voltIncrease
    this.ampIncrease = ampIncrease
  }
}

class HullUpgrade extends Upgrade {
  constructor (category, id, name, baseCost, massReduction) {
    super(category, id, name, baseCost)
    this.massReduction = massReduction
  }
}

const state = {
  upgrades: [
    new GeneratorUpgrade(1, 1001, 'gen upg 1', 10, 2, 4),
    new GeneratorUpgrade(1, 1002, 'gen upg 2', 125, 6, 5),
    new GeneratorUpgrade(1, 1003, 'gen upg 3', 600, 20, 6),
    new GeneratorUpgrade(1, 1004, 'gen upg 4', 1800, 65, 7),

    new CapacityUpgrade(2, 2001, 'stor upg 1', 100, 8, 2, 2),
    new CapacityUpgrade(2, 2002, 'stor upg 2', 1250, 9, 6, 6),
    new CapacityUpgrade(2, 2003, 'stor upg 3', 6000, 10, 20, 20),
    new CapacityUpgrade(2, 2004, 'stor upg 4', 18000, 11, 65, 65),

    new HullUpgrade(3, 3001, 'hull upg 1', 100, 20),
    new HullUpgrade(3, 3002, 'hull upg 2', 1250, 60),
    new HullUpgrade(3, 3003, 'hull upg 3', 6000, 200),
    new HullUpgrade(3, 3004, 'hull upg 4', 18000, 650)
  ]
}

var upCost = function (upg) {
  return upg.baseCost * Math.pow(1.15, upg.upgCount * ((upg.level / 100) + 1))
}

const mutations = {
  [types.BUY_UPGRADES] (state, {id}) {
    var upg = state.upgrades.find((upg) => upg.id === id)
    if (ship.state.minerals >= upCost(upg)) {
      ship.state.minerals -= upCost(upg)
      upg.upgCount++
    }
  },
  [types.BUY_UPGRADE_UPGRADE] (state, {id}) {
    var upg = state.upgrades.find((upg) => upg.id === id)
    if (ship.state.minerals >= upCost(upg) && upg.upgCount + 1 > ship.state.upgradeTiers[upg.level - 1]) {
      ship.state.minerals -= upCost(upg)
      console.log(id)
      upg.level++
    }
  }
}

const actions = {
  buyUpgrades: ({ commit }, id) => commit(types.BUY_UPGRADES, {id: id}),
  buyUpgradeUpgrade: ({ commit }, id) => commit(types.BUY_UPGRADE_UPGRADE, {id: id})

}

const getters = {
  generatorUpgrades: state => state.upgrades.filter((upg) => upg.category === 1),
  storageUpgrades: state => state.upgrades.filter((upg) => upg.category === 2),
  hullUpgrades: state => state.upgrades.filter((upg) => upg.category === 3)
}

export default {
  state,
  getters,
  actions,
  mutations
}

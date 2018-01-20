// import Vue from 'vue'
// import Vuex from 'vuex'
import * as types from '../mutation-types'
import ship from './ship'

class Upgrade {
  constructor (category, id, name, baseCost, icon, manufacturer) {
    this.category = category
    this.id = id
    this.name = name
    this.baseCost = baseCost
    this.upgCount = 0
    this.level = 1
    this.icon = icon
    this.manufacturer = manufacturer
  }
}

class GeneratorUpgrade extends Upgrade {
  constructor (category, id, name, baseCost, icon, manufacturer, baseProd, massIncrease) {
    super(category, id, name, baseCost, icon, manufacturer)
    this.massIncrease = 100 / 4 * massIncrease
    this.baseProd = baseProd
  }
  get prod () {
    return this.baseProd * this.upgCount * this.level
  }
}

class CapacityUpgrade extends Upgrade {
  constructor (category, id, name, baseCost, icon, manufacturer, massIncrease, voltIncrease, ampIncrease) {
    super(category, id, name, baseCost, icon, manufacturer)
    this.massIncrease = 100 / 4 * massIncrease
    this.voltIncrease = voltIncrease
    this.ampIncrease = ampIncrease
  }
}

class HullUpgrade extends Upgrade {
  constructor (category, id, name, baseCost, icon, manufacturer, massReduction) {
    super(category, id, name, baseCost, icon, manufacturer)
    this.massReduction = massReduction
  }
}

const state = {
  manufacturers: ['Hattrex', 'Alphgro', 'Linpoly', 'Nitranet', 'Altreo', 'Mudeno', 'Enthsa', 'Obtax', 'Shav', 'Octood', 'Curavi', 'Tyrcor'],
  upgrades: [
    new GeneratorUpgrade(1, 1001, 'Solar Cell', 10, ['fas', 'microchip'], 0, 2, 4),
    new GeneratorUpgrade(1, 1002, 'Bio Generator', 125, ['fas', 'microchip'], 0, 6, 5),
    new GeneratorUpgrade(1, 1003, 'Static Charger', 600, ['fas', 'microchip'], 0, 20, 6),
    new GeneratorUpgrade(1, 1004, 'Fission Core', 1800, ['fas', 'microchip'], 0, 65, 7),

    new CapacityUpgrade(2, 2001, 'Alloy Capacitor', 100, ['fas', 'battery-bolt'], 0, 8, 2, 2),
    new CapacityUpgrade(2, 2002, 'High Capcacity Cells', 1250, ['fas', 'battery-bolt'], 0, 9, 6, 6),
    new CapacityUpgrade(2, 2003, 'Temperature Controller', 6000, ['fas', 'battery-bolt'], 0, 10, 20, 20),
    new CapacityUpgrade(2, 2004, 'Ion Controller', 18000, ['fas', 'battery-bolt'], 0, 11, 65, 65),

    new HullUpgrade(3, 3001, 'Reinforced H-Beams', 100, ['fas', 'rocket'], 0, 20),
    new HullUpgrade(3, 3002, 'Double Layer Glass', 1250, ['fas', 'rocket'], 0, 60),
    new HullUpgrade(3, 3003, 'Shielding', 6000, ['fas', 'rocket'], 0, 200),
    new HullUpgrade(3, 3004, 'Super Thin Walls', 18000, ['fas', 'rocket'], 0, 650)
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
  hullUpgrades: state => state.upgrades.filter((upg) => upg.category === 3),
  upgrades: state => state.upgrades,
  manufacturers: state => state.manufacturers
}

export default {
  state,
  getters,
  actions,
  mutations
}

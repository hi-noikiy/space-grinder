import * as types from '../mutation-types'

class Research {
  constructor (id, image, desc, name, unlockReq, stats) {
    this.id = id
    this.image = image
    this.desc = desc
    this.name = name
    this.unlockReq = unlockReq
    this.stats = stats
    this.level = 0
  }

  get description () {
    if (this.stats !== undefined) {
      let voltIncreaseTooltip = `Increases Volt with ${this.stats.voltIncrease}%</br>`
      let ampIncreaseTooltip = `Increases mAh with ${this.stats.ampIncrease}%</br>`
      let coulombIncreaseTooltip = `Increases generation with ${this.stats.coulombIncrease}%</br>`
      let massDecreaseTooltip = `Decrease ship mass with ${this.stats.massDecrease}%</br>`
      let mineralIncreaseTooltip = `Increases Mineral production with ${this.stats.mineralIncrease}%</br>`
      return this.desc + '</br></br>' + voltIncreaseTooltip + ampIncreaseTooltip + coulombIncreaseTooltip + massDecreaseTooltip + mineralIncreaseTooltip
    } else {
      return this.desc + '</br>'
    }
  }
}

class UnlockReq {
  constructor () {
    this.coulumbs = coulombs
    this.minerals = minerals
    this.upgrade = [upgId: 0, upgCount: 0]
  }
}

class ResearchStats {
  constructor (vi, ai, ci, md, mi) {
    this.voltIncrease = vi
    this.ampIncrease = ai
    this.coulombIncrease = ci
    this.massDecrease = md
    this.mineralIncrease = mi
  }
}

const state = {
  research: [
    {
      new Research(1, null, "testresearch", "improved gen upg 1")
    }
  ]
}
// [types.INCREMENT_HYDROGEN] (state, {amount}) {
//   state.hydrogen += amount
// }
const mutations = {
}

// decrementMinerals: ({ commit }, amount) => commit(types.DECREMENT_MINERALS, {amount: amount})
const actions = {
}

const getters = {}

export default {
  state,
  getters,
  actions,
  mutations
}

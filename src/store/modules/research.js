import * as types from '../mutation-types'
import ship from './ship'

class Research {
  constructor (id, image, desc, name, baseCost, unlockReq, stats) {
    this.id = id
    this.image = image
    this.desc = desc
    this.name = name
    this.unlockReq = unlockReq
    this.stats = stats
    this.level = 0
    this.baseCost = baseCost
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
  constructor (coulombs, minerals, upgrade) {
    this.coulumbs = coulombs
    this.minerals = minerals
    this.upgrade = upgrade // [{upgId: 0, upgCount: 0}]
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
    new Research(1, null, 'testresearch', 'improved gen upg 1', 2500,
      new UnlockReq(0, 0, [{
        upgId: 1,
        upgCount: 1
      }]),
      new ResearchStats(0, 0, 5, 0, 0))
  ]
}

const mutations = {
  [types.BUY_RESEARCH] (state, { id }) {
    let res = state.research.find((r) => r.id === id)
    if (ship.state.minerals > (res.baseCost * res.level)) {
      res.level++
    }
  }

}

// decrementMinerals: ({ commit }, amount) => commit(types.DECREMENT_MINERALS, {amount: amount})
const actions = {}

const getters = {}

export default {
  state,
  getters,
  actions,
  mutations
}

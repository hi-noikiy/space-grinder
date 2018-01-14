import * as types from '../mutation-types'

class CrewMember {
  constructor (id, image, selected, desc, name, unlock, prof, stats) {
    this.id = id
    this.image = image
    this.desc = desc
    this.name = name
    this.unlock = unlock
    this.prof = prof
    this.selected = selected
    this.xp = 0
    this.stats = stats
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

class CrewStats {
  constructor (vi, ai, ci, md, mi) {
    this.morale = 1
    this.voltIncrease = vi
    this.ampIncrease = ai
    this.coulombIncrease = ci
    this.massDecrease = md
    this.mineralIncrease = mi
  }
}

const state = {
  crew: [
    new CrewMember(10, 'def', false, 'select a crewmember', 'Select member', 7200),
    new CrewMember(11, 'def', false, 'select a crewmember', 'Select member', 7200 * 1000),
    new CrewMember(12, 'def', false, 'select a crewmember', 'Select member', 7200 * 100000),
    new CrewMember(13, 'def', false, 'select a crewmember', 'Select member', 7200 * 10000000),
    new CrewMember(14, 'def', false, 'select a crewmember', 'Select member', 7200 * 1000000000)
  ],
  availableCrew: [
    new CrewMember(20, 'av1', false, 'Tracy Tzus affinity with mechanical engineering makes her perfect for increasing the raw stats of the ship.', 'Tracy Tzu', null, 'Mechanic', new CrewStats(5, 6, 2, 1, 3)),
    new CrewMember(21, 'av2', false, 'this is a description of the selected crewmember', 'Sally', null, 'Soldier', new CrewStats(2, 3, 4, 5, 4)),
    new CrewMember(22, 'av3', false, 'this is a description of the selected crewmember', 'Matt Stryker', null, 'Botanist', new CrewStats(1, 2, 6, 3, 4)),
    new CrewMember(23, 'av4', false, 'this is a description of the selected crewmember', 'Crewmember 1', null, 'Physicist ', new CrewStats(6, 1, 3, 2, 1)),
    new CrewMember(24, 'av5', false, 'this is a description of the selected crewmember', 'Crewmember 1', null, 'Deadbeat', new CrewStats(7, 2, 4, 2, 5))
  ]
}

const mutations = {
  [types.ASSIGN_CREWMEMBER] (state, {slotIdCrewId}) {
    if (!state.availableCrew[slotIdCrewId['crewId']].selected) {
      state.crew[slotIdCrewId['slotId']] = state.availableCrew[slotIdCrewId['crewId']]
      state.availableCrew[slotIdCrewId['crewId']].selected = true
    }
  }
}

const actions = {
  assignCrewMember: ({ commit }, slotIdCrewId) => commit(types.ASSIGN_CREWMEMBER, {slotIdCrewId: slotIdCrewId})
}

const getters = {
  crew: state => state.crew,
  availableCrew: state => state.availableCrew
}

export default {
  state,
  getters,
  actions,
  mutations
}

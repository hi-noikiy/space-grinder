import Vue from 'vue'
import Vuex from 'vuex'
import * as types from '../mutation-types'

Vue.use(Vuex)

const state = {
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

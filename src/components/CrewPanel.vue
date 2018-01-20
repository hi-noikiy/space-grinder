<template>
  <div class="columns crew-panel">
    <div class="column col-8">
    <div>
          <div v-for="(member, index) in crew" class=" popover popover-right" :key="member.id" >
            <div class="tile tile-centered"  v-bind:class="{canBuy: (100 / member.unlock * coulombs) > 100}">
                <div class="tile-icon">
                  <figure class="avatar avatar-lg mx-1">
                    <img  v-if="member !== null" :src="avatars[member.image]"  v-bind:alt="member.desc">
                  </figure>
                </div>
                <div class="tile-content">
                  <div class="tile-title text-bold">{{member.name}}</div>
                  <div class="tile-subtitle " v-if="member.prof !== undefined">{{member.prof}}</div>
                  <div class="tile-subtitle " v-if="member.prof === undefined && (100 / member.unlock * coulombs) < 100">{{100 / member.unlock * coulombs | exponentialize }} %</div>
                  <div class="tile-subtitle " v-if="member.prof === undefined && (100 / member.unlock * coulombs) > 100">Unlocked</div>
                </div>
                <div class="tile-action">
                  <button class="btn btn-link"  v-bind:class="{disabled: (100 / member.unlock * coulombs) < 100}" v-on:click="showCrewSelectionPanel(index)">
                    <i class="icon icon-plus"></i>
                  </button>
                </div>
            </div>
             <div class="popover-container" v-if="member.stats !== undefined">
              <div class="card">
                <div class="card-header">
                  <span class="text-bold">{{member.name}}</span>
                </div>
                <div class="card-body">
                  <span v-html="member.description"></span>
                </div>
                <div class="card-footer">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
   <div class="column col-4">
<transition name="slide">
          <div class="container crew-select" v-if="showSelectionPanel" v-on:click="hideCrewSelectionPanel">
            <figure
              class="avatar avatar-xl mx-1 crew-avatar"
              v-for="(member, index) in availableCrew"
              :key="member.id"
              v-bind:class="{crewselected: member.selected}"
              v-on:click="selectCrewMember(index)">
              <img :src="avatars[member.image]" v-bind:alt="member.desc">
            </figure>
           </div>
        </transition>
      </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import def from './../assets/images/default.png'
import avatar1 from './../assets/images/avatar_1.png'
import avatar2 from './../assets/images/avatar_2.png'
import avatar3 from './../assets/images/avatar_3.png'
import avatar4 from './../assets/images/avatar_4.png'
import avatar5 from './../assets/images/avatar_5.png'
export default {
  name: 'CrewPanel',
  data () {
    return {
      showSelectionPanel: false,
      selectedIndex: 0,
      avatars: {
        def: def,
        av1: avatar1,
        av2: avatar2,
        av3: avatar3,
        av4: avatar4,
        av5: avatar5
      }
    }
  },
  methods: {
    ...mapActions(['assignCrewMember']),
    showCrewSelectionPanel: function (index) {
      this.selectedIndex = index
      this.showSelectionPanel = true
    },
    hideCrewSelectionPanel: function () {
      this.showSelectionPanel = false
    },
    selectCrewMember: function (crewId) {
      this.assignCrewMember({ slotId: this.selectedIndex, crewId: crewId })
    }
  },
  computed: mapGetters(['crew', 'availableCrew', 'coulombs'])
}
</script>

<style scoped>

</style>

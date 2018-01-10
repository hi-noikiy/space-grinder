<template>

  <div class="columns">
    <div class="container crew-select" v-if="showSelectionPanel"  v-on:click="hideCrewSelectionPanel"></div>
        <figure class="avatar avatar-xl mx-1 crew-avatar" v-for="member in crew" v-bind:key="member.id" v-on:click="showCrewSelectionPanel">
           <img v-bind:src="member.image" alt="...">
         </figure>
        </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'CrewPanel',
  data () {
    return {
      showSelectionPanel: false
    }
  },
  methods: {
    showCrewSelectionPanel: function () {
      this.showSelectionPanel = true
    },
    hideCrewSelectionPanel: function () {
      this.showSelectionPanel = false
    }
  },
  computed: mapGetters(['crew'])
}
</script>

<style scoped>

</style>

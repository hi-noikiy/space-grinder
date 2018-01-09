<template>
    <div class="columns upgradepanel">
      <div class="column col-12">
        <span class="text-bold text-large">Generator Upgrades</span>
        <ul class="upgrades">
            <li v-for="upgrade in generatorUpgrades" v-bind:key="upgrade.id" v-bind:class="{canBuy: canBuy(upgrade.id)}">
                <UpgradeButton v-bind:upgrade="upgrade" />
            </li>
        </ul>
        <span class="text-bold text-large">Capacity Upgrades</span>
        <ul class="upgrades">
            <li v-for="upgrade in storageUpgrades" v-bind:key="upgrade.id" v-bind:class="{canBuy: canBuy(upgrade.id)}">
                <UpgradeButton v-bind:upgrade="upgrade" />
            </li>
        </ul>
        <span class="text-bold text-large">Hull Upgrades</span>
        <ul class="upgrades">
            <li v-for="upgrade in hullUpgrades" v-bind:key="upgrade.id" v-bind:class="{canBuy: canBuy(upgrade.id)}">
                <UpgradeButton v-bind:upgrade="upgrade" />
            </li>
        </ul>
      </div>

    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UpgradeButton from './UpgradeButton'
export default {
  name: 'ShipUpgradePanel',
  data () {
    return {

    }
  },
  components: {
    UpgradeButton
  },
  filters: {
    exponentialize: function (value) {
      var digits = 4
      //    console.log(`value ${value.toString().length} > ${digits} = ${value.toString().length > digits}`)
      if (value.toString().length > digits) {
        return value.toExponential(digits - 1)
      } else { return value }
    }
  },
  computed: mapGetters([
    'generatorUpgrades',
    'storageUpgrades',
    'hullUpgrades',
    'stardust'
  ]),
  methods: {
    canBuy: function (id) {
      var upg = this.generatorUpgrades.filter(u => u.id === id)[0]
      return (upg.baseCost * Math.pow(1.15, upg.upgCount)) < this.stardust
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
ul {
  margin: 0;
  margin-bottom: 8%;
  padding: 4px;
  background-color: rgb(168, 168, 168);
  border-radius: 3px;
}
li {
        list-style: none;
        background-color: rgb(21, 36, 22);
        color:aliceblue;
        border: 1px solid gray;
        border-radius: 3px;
        padding: 2px 4px;
    }
    .canBuy li:hover {
        background-color: rgba(73, 73, 73, 0.815);
    }
    .canBuy {
        background-color: rgb(83, 83, 83);
    }
    .upgradepanel {
        font-size: 0.6rem;
        margin-top: 10%;
    }
</style>

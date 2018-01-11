<template>
    <div class="columns upgradepanel">
      <div class="column col-12">
        <ul class="upgrades">
            <li class="heading"><span class="text-bold text-large">Generator Upgrades</span></li>
            <li v-for="upgrade in generatorUpgrades" v-bind:key="upgrade.id" v-bind:class="{canBuy: canBuyGeneratorUpg(upgrade.id)}"  v-on:click="buyGeneratorUpgrades(upgrade.id)">
                <UpgradeButton v-bind:upgrade="upgrade" />
            </li>
        </ul>

        <ul class="upgrades">
            <li class="heading"><span class="text-bold text-large">Capacity Upgrades</span></li>
            <li v-for="upgrade in storageUpgrades" v-bind:key="upgrade.id" v-bind:class="{canBuy: canBuyStorageUpg(upgrade.id)}" v-on:click="buyStorageUpgrades(upgrade.id)">
                <UpgradeButton v-bind:upgrade="upgrade" />
            </li>
        </ul>

        <ul class="upgrades">
            <li class="heading"><span class="text-bold text-large">Hull Upgrades</span></li>
            <li v-for="upgrade in hullUpgrades" v-bind:key="upgrade.id" v-bind:class="{canBuy: canBuyHullUpg(upgrade.id)}" v-on:click="buyHullUpgrades(upgrade.id)">
                <UpgradeButton v-bind:upgrade="upgrade" />
            </li>
        </ul>
      </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
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
      if (value.toString().length > digits) {
        return value.toExponential(digits - 1)
      } else { return value }
    }
  },
  computed: mapGetters([
    'generatorUpgrades',
    'storageUpgrades',
    'hullUpgrades',
    'minerals'
  ]),
  methods: {
    ...mapActions([
      'buyGeneratorUpgrades',
      'buyStorageUpgrades',
      'buyHullUpgrades',
      'incrementCoulombs',
      'incrementCoulombsClick',
      'setVolts',
      'setAmps',
      'incrementMass',
      'decrementMass'
    ]),
    canBuyGeneratorUpg: function (id) {
      var upg = this.generatorUpgrades.filter(u => u.id === id)[0]
      return (upg.baseCost * Math.pow(1.15, upg.upgCount)) < this.minerals
    },
    canBuyStorageUpg: function (id) {
      var upg = this.storageUpgrades.filter(u => u.id === id)[0]
      return (upg.baseCost * Math.pow(1.15, upg.upgCount)) < this.minerals
    },
    canBuyHullUpg: function (id) {
      var upg = this.hullUpgrades.filter(u => u.id === id)[0]
      return (upg.baseCost * Math.pow(1.15, upg.upgCount)) < this.minerals
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>

</style>

<template>
    <div class="columns upgradepanel">
      <div class="column col-12">

        <details  class="accordion upgrade-panel" open>
          <summary  class="accordion-header">
            <i class="icon icon-arrow-right mr-1"></i>
            Generator Upgrades
          </summary >
          <div class="accordion-body">
            <ul class="upgrades">
                <li v-for="upgrade in generatorUpgrades" v-bind:key="upgrade.id" v-bind:class="{canBuy: canBuyUpg(upgrade.id)}"  >
                    <UpgradeButton v-bind:upgrade="upgrade" v-bind:tiers="upgradeTiers" v-bind:buyUpgradeFunction="buyUpgrades" v-bind:canBuyUpgradeFunction="canBuyUpg" />
                </li>
            </ul>
          </div>
        </details >

        <details class="accordion upgrade-panel">
          <summary class="accordion-header">
            <i class="icon icon-arrow-right mr-1"></i>
            Capacity Upgrades
          </summary>
          <div class="accordion-body">
            <ul class="upgrades">
                <li v-for="upgrade in storageUpgrades" v-bind:key="upgrade.id" v-bind:class="{canBuy: canBuyUpg(upgrade.id)}" >
                    <UpgradeButton v-bind:upgrade="upgrade" v-bind:tiers="upgradeTiers" v-bind:buyUpgradeFunction="buyUpgrades" v-bind:canBuyUpgradeFunction="canBuyUpg" />
                </li>
            </ul>
          </div>
        </details>

        <details class="accordion upgrade-panel">
          <summary class="accordion-header">
            <i class="icon icon-arrow-right mr-1"></i>
            Hull Upgrades
          </summary>
          <div class="accordion-body">
            <ul class="upgrades">
                <li v-for="upgrade in hullUpgrades" v-bind:key="upgrade.id" v-bind:class="{canBuy: canBuyUpg(upgrade.id)}" >
                    <UpgradeButton v-bind:upgrade="upgrade" v-bind:tiers="upgradeTiers" v-bind:buyUpgradeFunction="buyUpgrades" v-bind:canBuyUpgradeFunction="canBuyUpg" />
                </li>
            </ul>
          </div>
        </details>
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
  },
  computed: mapGetters([
    'generatorUpgrades',
    'storageUpgrades',
    'hullUpgrades',
    'minerals',
    'upgradeTiers',
    'upgrades'
  ]),
  methods: {
    ...mapActions([
      'buyUpgrades',
      'incrementCoulombs',
      'incrementCoulombsClick',
      'setVolts',
      'setAmps',
      'incrementMass',
      'decrementMass',
      'buyUpgradeUpgrade'
    ]),
    canBuyUpg: function (id) {
      var upg = this.upgrades.filter(u => u.id === id)[0]
      return (upg.baseCost * Math.pow(1.15, upg.upgCount)) < this.minerals
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>

</style>

<template>
    <div class="columns"  v-on:click.stop="buyUpgradeFunction(upgrade.id)">
      <div class="column col-6 text-bold">{{upgrade.name}}</div>
      <div class="column col-6 text-small"><span class="float-right">{{(upgrade.baseCost * Math.pow(1.15, upgrade.upgCount)) | exponentialize}}g</span></div>
      <!-- start conditional renders -->
      <!-- Generator -->
      <div class="column col-5 text-small" v-if="upgrade.prod !== undefined">{{upgrade.prod | exponentialize}}C</div>
      <!-- Capacity -->
      <div class="column col-2 text-small" v-if="upgrade.voltIncrease !== undefined">{{upgrade.voltIncrease * upgrade.upgCount | exponentialize}}V</div>
      <div class="column col-3 text-small" v-if="upgrade.ampIncrease !== undefined">{{upgrade.ampIncrease * upgrade.upgCount | exponentialize}}mAh</div>
      <!-- Hull -->
      <div class="column col-5 text-small" v-if="upgrade.massReduction !== undefined">-{{upgrade.massReduction * upgrade.upgCount | exponentialize}}kg</div>
      <!-- All -->
      <div class="column col-3 col-ml-auto text-left text-small" v-if="upgrade.massIncrease !== undefined">+{{upgrade.massIncrease | exponentialize}}kg</div>
      <div class="column col-3 col-ml-auto text-left text-small" v-if="upgrade.massIncrease === undefined"></div>
      <!-- end conditional renders -->
      <div class="column col-2 col-ml-auto text-left">#{{upgrade.upgCount}}</div>
      <div class="column col-2 col-ml-auto text-left">
        <button class="btn btn-primary btn-action btn-sm" v-bind:class="{disabled : upgrade.upgCount < upgradeTiers[upgrade.level-1]}" v-on:click.stop="buyUpgradeUpgrade(upgrade.id)">
          <span v-if="upgrade.upgCount < upgradeTiers[upgrade.level-1]">T{{upgrade.level}}</span>
          <i v-if="upgrade.upgCount+1 > upgradeTiers[upgrade.level-1]" class="icon icon-arrow-up"></i>
        </button>
      </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'UpgradeButton',
  props: {
    upgrade: {
      type: Object,
      required: true
    },
    tiers: {
      type: Array,
      required: true
    },
    buyUpgradeFunction: {
      required: true
    }
  },
  filters: {
  },
  computed: mapGetters([
    'upgradeTiers'
  ]),
  methods: {
    ...mapActions([
      'buyUpgradeUpgrade'
    ])
  }
}
</script>

<style scoped>

</style>

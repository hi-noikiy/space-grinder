<template>
    <div class="columns"  v-on:click.stop="buyUpgradeFunction(upgrade.id)">
<div class="column col-1">
  <div class=" text-bold text-large text-left"><font-awesome-icon v-bind:icon="upgrade.icon" /></div>
</div>
<div class="column columns  col-9">
  <div class="column col-10 text-bold">{{manufacturers[upgrade.manufacturer]}} {{upgrade.name}} Mk{{upgrade.level | convertToRoman}}</div>
  <div class="column col-2 col-ml-auto text-left">#{{upgrade.upgCount}}</div>
  <div class="column col-4 text-small">{{(upgrade.baseCost * Math.pow(1.15, upgrade.upgCount)) | exponentialize}}g</div>
      <!-- start conditional renders -->
      <!-- Generator -->
      <div class="column col-4 text-small" v-if="upgrade.prod !== undefined">{{upgrade.prod | exponentialize}}C</div>
      <!-- Capacity -->
      <div class="column col-2 text-small" v-if="upgrade.voltIncrease !== undefined">{{upgrade.voltIncrease * upgrade.upgCount | exponentialize}}V</div>
      <div class="column col-2 text-small" v-if="upgrade.ampIncrease !== undefined">{{upgrade.ampIncrease * upgrade.upgCount | exponentialize}}mAh</div>
      <!-- Hull -->
      <div class="column col-4 text-small" v-if="upgrade.massReduction !== undefined">-{{upgrade.massReduction * upgrade.upgCount | exponentialize}}kg</div>
      <!-- All -->
      <div class="column col-3 col-ml-auto text-left text-small" v-if="upgrade.massIncrease !== undefined">+{{upgrade.massIncrease | exponentialize}}kg</div>
      <div class="column col-3 col-ml-auto text-left text-small" v-if="upgrade.massIncrease === undefined"></div>
      <!-- end conditional renders -->

</div>
<div class="column col-1 col-ml-auto">
   <button class="btn btn-primary btn-action btn-lg float-right" v-bind:class="{disabled : (upgrade.upgCount < upgradeTiers[upgrade.level-1]) || !canBuyUpgradeFunction(upgrade.id)}" v-on:click.stop="buyUpgradeUpgrade(upgrade.id)">
          <span v-if="upgrade.upgCount < upgradeTiers[upgrade.level-1]">Mk {{upgrade.level | convertToRoman}}</span>
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
    },
    canBuyUpgradeFunction: {
      required: true
    }
  },
  filters: {
    convertToRoman: function (num) {
      var numeralCodes = [['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'],         // Ones
                          ['', 'X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC'],   // Tens
                          ['', 'C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM']]        // Hundreds

      var numeral = ''
      var digits = num.toString().split('').reverse()
      for (var i = 0; i < digits.length; i++) {
        numeral = numeralCodes[i][parseInt(digits[i])] + numeral
      }
      return numeral
    }
  },
  computed: mapGetters([
    'upgradeTiers',
    'manufacturers'
  ]),
  methods: {
    ...mapActions([
      'buyUpgradeUpgrade'
    ])
  }
}
</script>

<style scoped>
.text-large {
  font-size: 0.8rem;
}
</style>

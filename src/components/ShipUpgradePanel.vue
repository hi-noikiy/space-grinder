<template>
    <div class='columns upgradepanel'>
      <div class='column col-2'>
        <ul>
            <li v-for='upgrade in upgrades' v-bind:key='upgrade.id' v-bind:class="{canBuy: canBuy(upgrade.id)}">
                <div class='columns' v-on:click="buyUpgrade(upgrade.id)">
                    <div class='column col-12 text-bold'>{{upgrade.name}}</div>
                    <div class='column col-12'>{{(upgrade.baseCost * Math.pow(1.15, upgrade.upgCount)) | exponentialize}}</div>
                    <div class='column col-6'>{{upgrade.baseProd * upgrade.upgCount | exponentialize}}</div>
                    <div class='column col-6 col-ml-auto text-left'>{{upgrade.upgCount}}</div>
                </div>
            </li>
        </ul>
      </div>
      
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'ShipUpgradePanel',
  data () {
    return {

    }
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
    'upgrades',
    'stardust'
  ]),
  methods: {
    ...mapActions([
      'buyUpgrade'
    ]),
    canBuy: function (id) {
      var upg = this.upgrades.filter(u => u.id === id)[0]
      return (upg.baseCost * Math.pow(1.15, upg.upgCount)) < this.stardust
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
    li {
        list-style: none;
        background-color: rgb(21, 36, 22);
        color:aliceblue;
        border: 1px solid gray;
        border-radius: 3px;
        padding: 2px 4px;
    }
    .canBuy li:hover {
        background-color: rgba(95, 160, 98, 0.815);
    }
    .canBuy {
        background-color: rgb(95, 160, 98);
    }
    .upgradepanel {
        font-size: 0.6rem;
    }
</style>

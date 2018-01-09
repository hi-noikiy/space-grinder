<template>
    <div class="columns">
      <div class="column col-12 text-bold">{{upgrade.name}}</div>
      <div class="column col-12">{{(upgrade.baseCost * Math.pow(1.15, upgrade.upgCount)) | exponentialize}}</div>
      <div class="column col-6">{{upgrade.baseProd * upgrade.upgCount | exponentialize}}</div>
      <div class="column col-6 col-ml-auto text-left">{{upgrade.upgCount}}</div>
    </div>
</template>

<script>
export default {
  name: 'UpgradeButton',
  props: {
    upgrade: {
      type: Object,
      required: true
    }
  },
  filters: {
    exponentialize: function (value) {
      var digits = 4
      if (value.toString().length > digits) {
        return value.toExponential(digits - 1)
      } else { return value }
    }
  }
}
</script>

<style scoped>

</style>

<template>
  <div class="row justify-content-center">
    <div class="col-sm-10">

      <h1>Account:</h1>
      <!-- Here shall be your saved investments -->
      <app-single-stock
        v-for="(stock, keyName) in acquiredStocks"
        :key="keyName"
        :stockName="keyName"
        :stockValue="stocks[keyName].marketValue"
        inputPlaceholder="Sell stocks"
      >
        <template slot="button">{{buttonName}}</template>
      </app-single-stock>
    
    </div>
  </div>
</template>

<script>
import SingleStock from '@/components/SingleStock.vue'
import { mapGetters } from 'vuex'
export default {
  components: {
    appSingleStock: SingleStock
  },
  data() {
    return {
      buttonName: 'Sell',
      key: 0
    }
  },
  computed: {
    ...mapGetters({
      stocks: 'getStocks',
      acquiredStocks: 'getAcquiredStocks'
    })
  }
}
</script>

<style scoped>
</style>

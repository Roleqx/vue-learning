<template>
  <div class="row justify-content-center">
    <div class="col-sm-10">
      <h1>Stocks:</h1>

      <app-single-stock
        v-for="(stock) in stocks"
        :key="stock.id"
        :stockName="stock.name"
        :stockValue="stock.marketValue"
      >
        <template slot="button">{{buttonName}}</template>
      </app-single-stock>
    </div>
  </div>
</template>

<script>
import SingleStock from '@/components/SingleStock.vue'
import { mapGetters, mapMutations } from 'vuex'
export default {
  data() {
    return {
      buttonName: 'Buy'
    }
  },
  computed: {
    ...mapGetters({
      stocks: 'getStocks'
    })
  },
  components: {
    appSingleStock: SingleStock
  },
  methods: {
    ...mapMutations({
      updateValues: 'updateMarketValues'
    })
  },
  watch: {
    stocks(stocks) {
      this.stocks = stocks
    }
  },
  created() {
    this.updateValues()
  }
}
</script>

<style scoped>
</style>

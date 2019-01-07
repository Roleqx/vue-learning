<template>
  <div class="row justify-content-center">
    <div class="col-sm-10">
      <h1>Account:</h1>
      <!-- Here shall be your saved investments -->
      <transition name="show" mode="out-in" type="transition">
        <template v-if="Object.keys(filteredAcquiredStocks).length > 0">
          
            <app-single-stock
              v-for="(stock, keyName) in filteredAcquiredStocks"
              :key="keyName"
              :stockName="keyName"
              :stockValue="stocks[keyName].marketValue"
              :numberOfAcquiredStocks="stock"
              inputPlaceholder="Sell stocks"
              actionName="sell"
            >
              <template slot="button">{{buttonName}}</template>
            </app-single-stock>
        </template>
      <h1 class="text-center text-secondary" v-else>No available stocks.</h1>
      </transition>
    </div>
  </div>
</template>

<script>
import SingleStock from '@/components/SingleStock.vue'
import { mapGetters } from 'vuex'
import { objFilter } from '@/components/mixins/helpers'
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
      balance: 'getBalance',
      stocks: 'getStocks',
      acquiredStocks: 'getAcquiredStocks'
    }),
    filteredAcquiredStocks() {
      return objFilter(this.acquiredStocks)
    }
  }
}
</script>

<style scoped>
.show-enter , .show-leave-to {
  opacity:0;
}
.show-enter-active, .show-leave-active {
  transition: .3s
}
</style>

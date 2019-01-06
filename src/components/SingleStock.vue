<template>
  <div class="col-sm-6 d-inline-block my-3">
    <div class="col bg-green py-1 text-white">
      <h3 class="d-inline-block">{{StockNametoUpper}}</h3>-
      <span>Market Value:
        <strong>{{cmpStockValue}}$</strong>
      </span>
    </div>
    <div class="col bg-light border border-top-0 py-1 shadow">
      <div class="form-inline">
        <input
          type="number"
          class="form-control my-3 mr-auto"
          min="0"
          max="10000"
          v-model.number="stocksToBuy"
          :placeholder="inputPlaceholder"
        >
        <button
          class="btn btn-dark ml-auto"
          @click="buyStocks({ name: cmpStockName, NumberOfstocksTobuy: stocksToBuy, stockValue: cmpStockValue})"
        >
          <slot name="button">Buy</slot>
        </button>
      </div>
      <p v-if="SumUp">Aquiring
        <strong>{{stocksToBuy}}</strong> stocks(s) will cost :
        <strong>{{TotalCost}}$</strong>
      </p>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    stockName: String,
    stockValue: Number,
    inputPlaceholder: String,
    actionName: String
  },
  data() {
    return {
      cmpStockName: this.stockName,
      cmpStockValue: this.stockValue,
      stocksToBuy: null
    }
  },
  computed: {
    StockNametoUpper() {
      return this.cmpStockName.toUpperCase()
    },
    TotalCost() {
      return this.cmpStockValue * this.stocksToBuy
    },
    SumUp() {
      return this.stocksToBuy > 0
    }
  },
  methods: {
    ...mapActions({
      buyStocks: 'buyStocks'
    })
  },
  watch: {
    stockValue() {
      this.cmpStockValue = this.stockValue
    },
    stocksToBuy(newVal, oldVal) {
      if (newVal > 10000) {
        this.stocksToBuy = 10000
      } else if (newVal < 0) {
        this.stocksToBuy = oldVal
      }
    }
  }
}
</script>

<style scoped>
.bg-green {
  background: #16af56;
}
.form-control:focus {
  border-color: #4eb664;
  box-shadow: 0 0 0 3px rgba(29, 133, 54, 0.281);
}
</style>

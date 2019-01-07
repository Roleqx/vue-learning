<template>
  <div class="col-sm-6 d-inline-block my-3">
    <div class="col py-1 text-white" :class="headingClass">
      <h3 class="d-inline-block text-uppercase">{{cmpStockName}}</h3> -
      <span class="font-italic">Market price: </span>
      <span
        class="font-weight-bolder"
        :class="actionName === 'sell' ? 'text-green' : 'text-white'"
      >{{cmpStockValue}}$</span>
      
      <span v-if="isSellComponent" class="font-italic"> | Obtained stocks: </span>
      <span class="font-weight-bolder text-green">{{numberOfAcquiredStocks}}</span>
    </div>
    <div class="col bg-light border border-top-0 py-1 shadow stock-container">
      <div class="form-inline">
        <input
          type="number"
          class="form-control my-3 mr-auto"
          min="0"
          :max="maxUserCanBuy"
          v-model.number="inputValue"
          :placeholder="inputPlaceholder"
          @keyup.enter="submit()"
        >
        <button class="btn ml-auto" :class="buttonClass" @click="submit()">
          <slot name="button">Buy</slot>
        </button>
      </div>
      <transition name="slide-down">
        <p v-if="actionName === 'buy' && this.inputValue > 0">
          Aquiring
          <strong> {{inputValue}}</strong> stocks(s) will cost:
          <strong> {{TotalCost}}$</strong>
        </p>
        <p v-if="actionName === 'sell' && this.inputValue > 0">
          Selling
          <strong class="text-uppercase"> {{inputValue + ' ' + cmpStockName}} </strong> stocks(s) will reward: 
          <strong>{{TotalCost}}$</strong>
        </p>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  props: {
    stockName: String,
    stockValue: Number,
    numberOfAcquiredStocks: Number,
    inputPlaceholder: String,
    actionName: String
  },
  data() {
    return {
      cmpStockName: this.stockName,
      cmpStockValue: this.stockValue,
      inputValue: null
    }
  },
  computed: {
    ...mapGetters({
      balance: 'getBalance',
      allowInputRest: 'getAllowInputReset'
    }),
    TotalCost() {
      return this.cmpStockValue * this.inputValue
    },
    isSellComponent() {
      return this.numberOfAcquiredStocks !== undefined
    },
    maxUserCanBuy() {
      return Math.floor(this.balance / this.cmpStockValue)
    },
    headingClass() {
      return this.actionName === 'buy' ? 'bg-green' : 'bg-dark'
    },
    buttonClass() {
      return this.actionName === 'buy' ? 'btn-dark' : 'btn-green text-white'
    },
    currentRoute() {
      return this.$route.path
    }
  },
  methods: {
    ...mapActions({
      buyStocks: 'buyStocks',
      sellStocks: 'sellStocks'
    }),
    resetInput(SetValue = null) {
      if (this.allowInputRest) {
         this.inputValue = SetValue
      }
    },
    submit() {
      if (this.actionName === 'buy') {
        this.buyStocks({
          name: this.cmpStockName,
          NumberOfstocksTobuy: this.inputValue,
          stockValue: this.cmpStockValue
        })
        this.resetInput()
      } else {
        this.sellStocks({ name: this.cmpStockName, NumberOfstocksToSell: this.inputValue })
        this.resetInput()     
      }
    }
  },
  watch: {
    stockValue() {
      this.cmpStockValue = this.stockValue
    },
    inputValue(newVal, oldVal) {
      if (this.actionName === 'buy' && newVal > this.maxUserCanBuy) {
            this.inputValue = this.maxUserCanBuy
      } else if (this.actionName === 'sell' && newVal > this.numberOfAcquiredStocks) {
            this.inputValue = this.numberOfAcquiredStocks
      } else if (newVal < 0) {
            this.inputValue = 0 
      }
    }
  }
// export default end
}
</script>
<style lang="scss" scoped>
@import '../../node_modules/bootstrap/scss/bootstrap.scss';
$btnGreen: #16af56;
.btn-green {
  @include button-variant($btnGreen, $btnGreen, darken($btnGreen, 10%));
}
</style>

<style scoped>
.bg-green {
  background: #16af56;
}
.text-green {
  color: #20d16a;
}
.form-control:focus {
  border-color: #4eb664;
  box-shadow: 0 0 0 3px rgba(29, 133, 54, 0.281);
}

/* VUE ANIMATIONS SETUP */

.slide-down-enter {
  opacity: 0;
  transform: translateX(20px);
}
.slide-down-enter-active,
.slide-down-leave-active {
  transition: 0.3s;
}
.slide-down-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>

import Vue from 'vue'
import Vuex from 'vuex'

// importing modules
import stockListModule from './modules/stockList'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      balance: 20000
  },
  getters: {
      getBalance: state => state.balance
      
  },
  mutations: {
     deduct(state, howMuch) {
        state.balance -= howMuch
     } 
  },
  actions: {

  },
  modules: {
    stockListModule
  }
})

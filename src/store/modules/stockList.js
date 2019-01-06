import Vue from 'vue'
// Imports
// Importing Helpers
import { rand } from '@/store/storeHelpers'
// SOCK LIST STORE
export default {
  state: {
    stocks: [
      { id: 1, name: 'BMW', marketValue: 0 },
      { id: 2, name: 'Mercedes', marketValue: 0 },
      { id: 3, name: 'Audi', marketValue: 0 },
      { id: 4, name: 'Volkswagen', marketValue: 0 }
    ],
    acquiredStocks: {}
  },

  getters: {
    getStocks: state => state.stocks,
    getAcquiredStocks: state => state.acquiredStocks
  },

  mutations: {
    updateMarketValues(state) {
      state.stocks.forEach(stock => {
        stock.marketValue = rand(100, 500)
      })
    },
    buyStocks(state, boughtStock) {
      // boughtStock properties list : name, NumberOfstocksTobuy, StockValue
      // if the passed name exists within the acquiredStocks properties,
      if (boughtStock.name in state.acquiredStocks) {
        // update the value accordingly
        state.acquiredStocks[boughtStock.name] += boughtStock.NumberOfstocksTobuy
        console.log('updated stock !')
      } else {
        // otherwise add a new {proprty : value} set
        // Limitation overcome using Vue.set() as proposed in the vue documentation
        Vue.set(state.acquiredStocks, boughtStock.name, boughtStock.NumberOfstocksTobuy)
        // old way
        // state.acquiredStocks[boughtStock.name] = boughtStock.NumberOfstocksTobuy
        console.log('added stock !')
      }
    }
  },
  actions: {
    buyStocks({ commit, rootState }, boughtStock) {
      // boughtStock properties list : name, NumberOfstocksTobuy, StockValue
      // if the total of the bought stocks does not exceed the current funds
      if (rootState.balance - boughtStock.stockValue * boughtStock.NumberOfstocksTobuy >= 0) {
        // deduct the sum from the current balance + add/update and save the aquired stocks (2nd line)
        commit('deduct', boughtStock.stockValue * boughtStock.NumberOfstocksTobuy)
        commit('buyStocks', boughtStock)
      } else {
        // otherwise, cancel the transaction
        alert('Fobidden transaction, insufficent funds')
        return false
      }
    }
  }
}

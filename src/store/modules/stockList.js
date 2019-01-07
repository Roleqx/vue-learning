import Vue from 'vue'
// Imports
// Importing Helpers
import { rand } from '@/store/storeHelpers'
// SOCK LIST STORE
export default {
  state: {
    stocks: {
      bmw: { id: 1, name: 'bmw', marketValue: 0 },
      mercedes: { id: 2, name: 'mercedes', marketValue: 0 },
      audi: { id: 3, name: 'audi', marketValue: 0 },
      volkswagen: { id: 4, name: 'volkswagen', marketValue: 0 }
    },
    acquiredStocks: {},
    allowInputReset: true
  },

  getters: {
    getStocks: state => state.stocks,
    getAcquiredStocks: state => state.acquiredStocks,
    getAllowInputReset: state => state.allowInputReset
  },

  mutations: {
    updateMarketValues(state) {
      // state.stocks.forEach((stock, key) => {
      //   stock.marketValue = rand(100, 500)
      // })
      for (let key in state.stocks) {
        // Vue.set(state.stocks, state.stocks[key].marketValue, rand(100, 500))
        state.stocks[key].marketValue = rand(100, 500)
      }
    },
    buyStocksMutation(state, boughtStock) {
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
    },
    sellStocksMutation(state, soldStocks) {
      // stoldStocks properties list :  name, NumberOfstocksToSell
      state.acquiredStocks[soldStocks.name] -= soldStocks.NumberOfstocksToSell
    }
  },
  actions: {

    buyStocks({ commit, state, rootState }, boughtStock) {
      // boughtStock properties list : name, NumberOfstocksTobuy, StockValue
      // if passed numberOfStocksToBuy is 0 or undefined
      if (boughtStock.NumberOfstocksTobuy > 0 || undefined) {
        // if the total of the bought stocks does not exceed the current funds
        if (rootState.balance - boughtStock.stockValue * boughtStock.NumberOfstocksTobuy >= 0) {
          // deduct the sum from the current balance + add/update and save the aquired stocks (2nd line)
          commit('deduct', boughtStock.stockValue * boughtStock.NumberOfstocksTobuy)
          commit('buyStocksMutation', boughtStock)
          state.allowInputReset = true
        } else {
          // otherwise, cancel the transaction
          state.allowInputReset = false
          alert('Fobidden transaction, insufficent funds')
          return false
        }
      } else {
        return false
      }
      // end buyStocks Action
    },
    sellStocks({ commit, state }, soldStocks) {
      if ((state.acquiredStocks[soldStocks.name] - soldStocks.NumberOfstocksToSell) >= 0) {
        // add the total value of the sold stocks to the balance
        commit('add', state.stocks[soldStocks.name].marketValue * soldStocks.NumberOfstocksToSell)
        commit('sellStocksMutation', soldStocks)
      } else {
        alert('You do not possess this number of stocks for ' + soldStocks.name)
        return false
      }
    }
  },
  sellStocks() {
    return false
  }
}

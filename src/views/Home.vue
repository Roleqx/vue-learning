<template>
  <div class="row justify-content-center">
    <div class="col-sm-10 shadow-sm bg-light">
      <h1>Welcome to StockTrader</h1>
      <p>a place where you can buy and sell market stocks.</p>
      <p>Your current Balance : <strong>{{balance}}$</strong></p>
			{{acquired}} - <button class="btn btn-dark" @click="openModal">Test</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import $ from 'jquery'

export default {
  computed: {
    ...mapGetters({
			balance: 'getBalance',
			acquired: 'getAcquiredStocks'
    })
	},
	methods: {
		openModal() {
			$('#myModal').modal()
		}
	}
}
</script>

<style scoped>
</style>

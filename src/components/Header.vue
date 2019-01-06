<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-3">
      <router-link :to="{name: 'homeRoute'}" class="navbar-brand">StockTrading</router-link>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <router-link tag="li" :to="{name: 'homeRoute'}" class="nav-item" active-class="active" exact>
            <a class="nav-link">Home</a>
          </router-link>
          <router-link tag="li" :to="{name: 'stocksRoute'}" class="nav-item" active-class="active">
            <a class="nav-link">Stocks</a>
          </router-link>
          <router-link tag="li" :to="{name: 'accountRoute'}" class="nav-item" active-class="active">
            <a class="nav-link">Account</a>
          </router-link>
        </ul>
				<ul class="navbar-nav ml-auto">
					<li class="nav-item"><a class="nav-link" style="cursor:pointer" @click="updateMarketValues">Next day</a></li>
					<li class="nav-item dropdown">
						<a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							Operations
						</a>
						<div class="dropdown-menu rounded-0 border-0 shadow-sm" aria-labelledby="navbarDropdownMenuLink">
							<a class="dropdown-item rounded-0" href="#">Save</a>
							<a class="dropdown-item rounded-0" href="#">Load</a>
						</div>
					</li>
					<li><span class="navbar-text"><strong>Funds : {{balance}}$</strong></span></li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
 import 'bootstrap'
 import { mapGetters, mapMutations } from 'vuex'

  export default {
		computed: {
			...mapGetters({
				balance: 'getBalance'
			})
		},
		methods: {
			...mapMutations({
				updateMarketValues: 'updateMarketValues'
			}),
			update() {
				return console.log('updated : method')
			}
		}
	}

</script>

<style scoped>
.navbar-brand {
	color:#56ce7a;
	font-weight: bold;
}
.dropdown-item:active{
	background:#46a763;
}
</style>

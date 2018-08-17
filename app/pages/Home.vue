<template>
	<v-app>
		<main>
			<v-container fill-height grid-list-xl text-xs-center>
				<v-layout row wrap>
					<v-flex offset-xs1 offset-sm2 offset-md3 xs10 sm8 md6>
						<v-card>
							<v-card-title primary-title class="primary white--text">
								<div class="headline">{{ "Hello Coin" }}</div>
							</v-card-title>
							<v-card-actions class="white">
								<form style="width:100%">
									<v-text-field
										v-model="name"
										label="Name"
										type="text"						
									></v-text-field>
									<v-text-field
										v-model="symbol"
										label="Symbol"
										type="text"
									></v-text-field>
									<v-text-field
										v-model="decimals"
										label="Decimals"
										type="text"
									></v-text-field>
								</form>
							</v-card-actions>
						</v-card>
					</v-flex>
				</v-layout>
			</v-container>
		</main>
	</v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import Web3 from 'web3'
let web3 = new Web3("http://localhost:8545");

export default {
	data() {
		return {
			name: '',
			symbol: '',
			decimals: ''
		}
	},
	mounted() {
		this.$store.dispatch('getCoinInfo')
				.then((result) => { // 接收 resolve
					console.log(result);
					this.name = result.name;
					this.symbol = result.symbol;
					this.decimals = result.decimals;
				})
				.catch((err) => { // 接收 reject
					console.log(err.error)
				});
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scope>
</style>
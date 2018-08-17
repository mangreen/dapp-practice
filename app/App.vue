<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	name: 'App',
	computed: mapGetters({
	}),
}
</script>

<style scope>
#login-form {
	width: 90%;
	margin: 0 auto;
}

#logo {
	width: 200px;
	height: 36px;
	margin-bottom: 10px;
}
</style>

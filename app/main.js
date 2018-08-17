//fixed ie11 bug "vuex requires a promise polyfill in this browser"
import 'es6-promise/auto'

import Vue from 'vue'
import Vuetify from 'vuetify'
import _ from "lodash";

import app from './App';
import router from './router';
import store from './store';

import 'font-awesome/css/font-awesome.min.css'
import 'material-icons/iconfont/material-icons.css'
import 'mdi/css/materialdesignicons.min.css'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify, {
	theme: {
		primary: '#00acc1',  // cyan darken-1
		accent: '#00e5ff',  // cyan accent-3
		secondary: '#bdbdbd',  // grey lighten-1
		info: '#42a5f5',  // blue lighten-1
		warning: '#ffa000',  // amber darken-2
		error: '#d50000',  // amber darken-2
		success: '#81c784'  // green lighten-2
	}
});

//Vue.config.debug = false;
//Vue.config.devtools = false;
Vue.config.productionTip = false

Vue.prototype.$eventHub = new Vue(); // Global event bus

if (window.__INITIAL_STATE__) {
	store.replaceState(_.assign(store.state, window.__INITIAL_STATE__))
}

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	render: h => h(app)
})

import Vue from 'vue'
import Vuex from 'vuex'

import { state, mutations } from './mutations.js'
import * as getters from './getters.js'
import * as actions from './actions.js'

Vue.use( Vuex );

export default new Vuex.Store({
	state,
	actions,
	mutations,
	getters,
	modules: {},
	// 嚴格模式，禁止直接修改 state
	//strict: true
});

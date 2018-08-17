import * as types from './mutations_types.js';

export const state = {
	name: '',
	symbol: '',
	decimals: ''
};

export const mutations = {
	[types.FETCH_COIN_INFO](state, payload) {
		Object.assign(state, payload);
	}
};

import Vue from 'vue';
import axios from 'axios';
import qs from 'qs';

import * as types from './mutations_types.js';

export const getCoinInfo = ({ dispatch, commit, getters, rootGetters }, payload) => {
  	return axios({
  			method: 'GET',
  			url: '/api/blocks',
  			timeout: 30000,
	  	})
		.then((response) => {
		  	commit(types.FETCH_COIN_INFO, response.data);
		  	return response.data;
		})
		.catch((error) => {
		    throw error;
	  	});
}

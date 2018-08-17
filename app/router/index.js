import Vue from 'vue'
import Router from 'vue-router'

import store from '../store';

const Home = () => import('@/pages/Home')

Vue.use(Router)

const router = new Router({
	mode: 'history',
	routes: [{
		path: '/',
		name: 'home',
		component: Home,
	}, { 
		path: '/*', redirect: '/' 
	}]
})

export default router;

import Vue from 'vue';
import Router from 'vue-router';
import store from '../store'

import Home from '../views/Home'
import Character from '../views/Character'
import Characters from '../views/Characters'
import Versus from '../views/Versus'
import Settings from '../views/Settings'
import hasValidApiToken from './middleware/hasValidApiToken';

Vue.use(Router);

const router = new Router({
	routes: [
		{
			path: "/home",
			name: 'home',
			component: Home,
			// meta: {
			// 	middleware: [
			// 		hasValidApiToken
			// 	]
			// }
		},
		{
			path: "/character/:me/vs/:opponent",
			name: 'versus',
			component: Versus,
			// meta: {
			// 	middleware: [
			// 		hasValidApiToken
			// 	]
			// }
		},
		{
			path: "/character/:me",
			name: 'character',
			component: Character,
			// meta: {
			// 	middleware: [
			// 		hasValidApiToken
			// 	]
			// }
		},
		{
			path: "/characters",
			name: 'characters',
			component: Characters,
			// meta: {
			// 	middleware: [
			// 		hasValidApiToken
			// 	]
			// }
		},
		{
			path: "/settings",
			name: "settings",
			component: Settings
		},
		{
			path: '*',
			redirect: '/home'
		}
	]
})

// TODO: If more complicated middleware is needed, try this:
// https://blog.logrocket.com/vue-middleware-pipelines/
// router.beforeEach((to, from, next) => {
// 	if (!to.meta.middleware) {
// 		return next()
// 	}
// 	const middleware = to.meta.middleware

// 	const context = {
// 		to,
// 		from,
// 		next,
// 		store
// 	}
	
// 	return middleware[0]({
// 		...context
// 	})
// })

export default router
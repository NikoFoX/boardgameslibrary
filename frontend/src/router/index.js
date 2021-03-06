import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
// components
import Account from '@/components/Account'
import Login from '@/views/login'
import Library from '@/views/library/list/GameList'
import Matches from '@/views/matches/list/Matches'
import GameDetails from '@/views/library/edit/GameDetails'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Login',
		component: Login,
		beforeEnter: (to, from, next) => {
			if (sessionStorage.getItem('user')) {
				next('/library')
			} else {
				next()
			}
		},
	},
	{
		path: '/matches',
		name: 'Matches',
		component: Matches,
	},
	{
		path: '/library',
		name: 'Library',
		component: Library,
	},
	{
		path: '/library/:id',
		name: 'GameDetails',
		component: GameDetails,
		props: true,
	},
	{
		path: '/account',
		name: 'Account',
		component: Account,
	},
	// {
	//   path: '/about',
	//   name: 'About',
	//   // route level code-splitting
	//   // this generates a separate chunk (about.[hash].js) for this route
	//   // which is lazy-loaded when the route is visited.
	//   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
	// }
]

const router = new VueRouter({
	mode: "history",
	routes,
})

// $router.push() overwrite to catch all errors when navigation is aborted
// (due to eg. NavigationDuplicated error when app navigates to actual view)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function(location) {
	return originalPush.call(this, location).catch((err) => err)
}

export default router

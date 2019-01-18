import Vue from 'vue'
import Vuex from 'vuex'
import types from './mutationsTypes'
Vue.use(Vuex)
export default new Vuex.Store({
	state: {
		isSet: false,
		theme: 'theme-color-defualt',
		member: {
			needNewOrderQuery: false,
		}
	},
	mutations: {
		[types.CHANGE_IS_SET] (state, flag) {
			state.isSet = flag
		},
		[types.MEMBER.NEW_ORDER_QUERY] (state) {
			state.member.needNewOrderQuery = true
		},
		[types.MEMBER.END_NEW_ORDER_QUERY] (state) {
			state.member.needNewOrderQuery = false
		},
	},
	actions: {
		// async checkIsLogin({ commit }, data) {
		// 	return new Promise((resolve, reject) => {
		// 		resolve(true)
		// 	})
		// },
	},
	modules: {
	}
})

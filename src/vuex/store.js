import vue from 'vue'
import vuex from 'vuex'

vue.use(vuex);

const state = {
	login: false,
	departInfo:[]
}

const mutations = {
	changeLogState(state, val) {
		return (state.login = val);
	},
	changeDepart(state,val){
		return(state.departInfo = val);
	}
}

export default new vuex.Store({
	state,
	mutations
})
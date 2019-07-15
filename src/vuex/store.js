import Vue from 'vue'
import Vuex from 'vuex'
import {LOGINED} from './mutation_types.js'

Vue.use(Vuex)
Vue.config.debug = true

const state = {
  hasLogin: false
}

const mutations = {
  [LOGINED] (state) {
    state.hasLogin = true
  }
}

export default new Vuex.Store({
  state,
  mutations
})

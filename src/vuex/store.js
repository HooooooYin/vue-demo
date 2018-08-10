import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  logined: false,
  user: JSON.parse(sessionStorage.getItem('user')) || ''
}

const mutations = {
  LOGIN (state) {
    state.user = JSON.parse(sessionStorage.getItem('user'))
  },
  LOGOUT (state) {
    state.user = ''
  },
  ADMINLOGIN (state) {
    state.admin = JSON.parse(sessionStorage.getItem('admin'))
  }
}

const actions = {
  login (context) {
    context.commit('LOGIN')
  },
  logout (context) {
    context.commit('LOGOUT')
  },
  adminLogin (context) {
    context.commit('ADMINLOGIN')
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})

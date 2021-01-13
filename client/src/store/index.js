import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    token: null,
    user: null,
    isUserLoggedIn: !!localStorage.getItem('token'),
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      if (token) {
        state.isUserLoggedIn = true;
        localStorage.setItem('token', token);
      } else {
        state.isUserLoggedIn = false;
        localStorage.removeItem('token', token);
      }
    },
    setUser(state, user) {
      state.user = user;
    },
    // updateUser(state, payload) {
    //   state.user[payload.property] = payload.value;
    // },
  },
  actions: {
    setToken({ commit }, token) {
      commit('setToken', token);
    },
    setUser({ commit }, user) {
      commit('setUser', user);
    },
  },
  getters: {},
  plugins: [
    createPersistedState({
      paths: ['user'],
    }),
  ],
});

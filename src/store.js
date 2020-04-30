import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      id: '',
      name: ''
    },
    isLogin: false,
    topicDetailId: -1,
  },
  getters: {
    user(state) {
      return state.user;
    },
    username(state) {
      return state.user.name;
    },
    userId(state) {
      return state.user.id;
    },
    isLogin(state) {
      return state.isLogin;
    },
    topicDetailId(state) {
      return state.topicDetailId;
    }
  },
  mutations: {
    login(state, user) {
      state.user = user;
      state.isLogin = true;
    },
    logout(state) {
      state.isLogin = false;
      state.user = {};
    },
    topicDetailId(state, id) {
      state.topicDetailId = id;
    }
  },
  actions: {
    login(context, user) {
      context.commit('login', user);
    },
    logout(context) {
      context.commit('logout');
    },
    setTopicDetailId(context, id) {
      context.commit('topicDetailId', id);
    }
  }
})

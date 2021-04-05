import {createStore} from 'vuex';
import { http } from '@/http';

const store = createStore({
  state: {
    user: {},
  },
  getters: {
    loggedin: (state) => state.user && (state.user.id || state.user._id),
    getUser: (state) => state.user || {}
  },
  mutations: {
    setUser(state, user) {
      if (!user) {
        state.user = null
      } else if (typeof user === 'object') {
        state.user = { ...user, id: user._id }
      }
    },
  },
  actions: {
    logout(context) {
      return http.get('/auth/logout')
        .then((res) => {
          context.commit('setUser', null);
          return res
        })
    },
    loadUser(context) {
      return http.get('/user')
        .then((res) => {
          context.commit('setUser', res.user)
          return res
        })
        .catch((ex) => {
          context.commit('setUser', null)
          throw ex
        })
    },
  }
});

export default store;

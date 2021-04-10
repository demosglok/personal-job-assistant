import {createStore} from 'vuex';
import { http } from '@/http';

const store = createStore({
  state: {
    user: {},
    profile: null
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
    setProfile(state, profile) {
      if(profile) {
        state.profile = {...profile};
      } else {
        state.profile = null;
      }
    }
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
    loadProfile(context) {
      return http.get('/profile')
        .then(res => {
          console.log('loadProfile', res);
          context.commit('setProfile', res.profile);
          return res;
        });
    },
    storeProfile(context, criterias) {
      return http.post('/profile', {criterias})
        .then(res => {
          context.commit('setProfile', res.profile);
          return res;
        });
    }
  }
});

export default store;

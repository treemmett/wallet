import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    session: {
      accessToken: '',
      loggedIn: false,
      sessionExpires: new Date(),
      userId: ''
    }
  },
  mutations: {
    login(
      { session },
      {
        accessToken,
        sessionExpires,
        userId
      }: { accessToken: string; sessionExpires: Date; userId: string }
    ) {
      session.accessToken = accessToken;
      session.sessionExpires = sessionExpires;
      session.userId = userId;
      session.loggedIn = true;
    }
  },
  actions: {
    login({ commit }, token: string) {
      const payload = JSON.parse(atob(token.split('.')[1]));

      commit({
        type: 'login',
        accessToken: token,
        userId: payload.sub,
        sessionExpires: new Date(payload.exp * 1000)
      });

      localStorage.setItem('accessToken', token);
    }
  }
});

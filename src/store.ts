import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';

import budget from './modules/budget';

Vue.use(Vuex);

const defaultSession = {
  accessToken: '',
  loggedIn: false,
  sessionExpires: new Date(),
  userId: ''
};

// check if there's an existing session
const existingToken = localStorage.getItem('accessToken');
if (existingToken) {
  const parts = existingToken.split('.');
  const payload = JSON.parse(atob(parts[1]));

  const exp = new Date(payload.exp * 1000);
  const iat = new Date(payload.iat * 1000);

  // check if session is still active
  if (exp > new Date() && new Date() > iat) {
    defaultSession.accessToken = existingToken;
    defaultSession.loggedIn = true;
    defaultSession.sessionExpires = exp;
    defaultSession.userId = payload.sub;
  } else {
    localStorage.removeItem('accessToken');
  }
}

const opt: StoreOptions<Rudget.RootState> = {
  modules: {
    budget
  },
  state: {
    session: defaultSession
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
};

export default new Vuex.Store(opt);

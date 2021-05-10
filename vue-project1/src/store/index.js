import { createStore } from "vuex";

export default createStore({
  state: {
    user: {
      loggedIn: false,
      data: null,
    },
  },
  mutations: {
    updateUserDetails(state, data) {
      state.user.data = data;
    },
    updateLoggedIn(state, value) {
      state.user.loggedIn = value;
    },
  },
  actions: {
    setUser({ commit }, user) {
      commit("updateLoggedIn", user !== null);
      if (user) {
        commit("updateUserDetails", {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        });
      } else {
        commit("updateUserDetails", null);
      }
    },
  },
  modules: {},
});

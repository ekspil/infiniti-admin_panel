import axios from "axios";
const host = "terminal-api.rb24.ru"

export default {
  state: {
    user: {
      name: "NO USER",
      token: null,
      id: null,
      role: null
    }
  },
  mutations: {
    setUserData(state, data) {
      state.user.name = data.name;
      state.user.token = data.id;
      state.user.id = data.id;
      state.user.role = data.role;
    },
    clearUserData(state) {
      state.user.name = "NO USER";
      state.user.token = null;
      state.user.id = null;
      state.user.role = null;
    }
  },

  actions: {
    async login({ commit }, { login, password }) {
      const result = await axios.post(
        "https://"+host+"/api/terminal/users/auth",
        {
          login,
          password
        }
      );


      if (result && result.data && result.data.id) {
        commit("setUserData", result.data);
        return true;
      } else {
        return false;
      }
    }
  }
};

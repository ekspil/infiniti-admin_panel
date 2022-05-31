import axios from "axios";
const host = "api.rb24.ru"

export default {
  state: {
    items: [],
    user: {
      name: "NO USER",
      token: null
    }
  },
  mutations: {
    setItems(state, data) {
      state.items = data;
    }
  },
  getters: {
    getItems(state) {
      return state.items;
    }
  },
  actions: {
    async getAllUsers({ dispatch, commit }, { password }) {
      try {
        const result = await axios.get(
          "https://" + host + "/api/terminal/users/get"
        );
        commit("setItems", result.data);
        return result.data;
      } catch (e) {
        console.log(dispatch, commit, password);
        throw e;
      }
    },
    async getAllItems({ dispatch, commit }, { password }) {
      try {
        const result = await axios.get(
          "https://" + host + "/api/terminal/items/get"
        );
        return result.data;
      } catch (e) {
        console.log(dispatch, commit, password);
        throw e;
      }
    },
    async getAllGroups({ dispatch, commit }, { password }) {
      try {
        const result = await axios.get(
          "https://" + host + "/api/terminal/groups/get"
        );
        return result.data;
      } catch (e) {
        console.log(dispatch, commit, password);
        throw e;
      }
    },
    async getAllProducts({ dispatch, commit }, { password , archive}) {
      try {
        let url = "https://" + host + "/api/terminal/products/get"
        if(archive) {
          url = url + "?archive=1"
        }
        const result = await axios.get(
          url
        );
        return result.data;
      } catch (e) {
        console.log(dispatch, commit, password);
        throw e;
      }
    },
    async getAllKiosks({ dispatch, commit }, { password, report }) {
      let add = ""
      try {
        if(report) add = "?report=1"
        const result = await axios.get(
          "https://" + host + "/api/terminal/kiosks/get" + add
          //"http://localhost/api/terminal/kiosks/get" + add
        );
        return result.data;
      } catch (e) {
        console.log(dispatch, commit, password);
        throw e;
      }
    },
    async getAllMods({ dispatch, commit }, { password }) {
      try {
        const result = await axios.get(
          "https://" + host + "/api/terminal/mods/get"
        );
        return result.data;
      } catch (e) {
        console.log(dispatch, commit, password);
        throw e;
      }
    },
    async getAllHelpers({ dispatch, commit }, { password }) {
      try {
        const result = await axios.get(
          "https://" + host + "/api/kiosk/helpers/get"
        );
        return result.data;
      } catch (e) {
        console.log(dispatch, commit, password);
        throw e;
      }
    },
    async saveProduct(store, data) {
      try {
        await axios.post(
          "https://" + host + "/api/terminal/products/save",
          data
        );
        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
    async saveKiosk(store, data) {
      try {
        await axios.post(
          "https://" + host + "/api/terminal/kiosks/save",
          data
        );
        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
    async saveGroup(store, data) {
      try {
        await axios.post(
          "https://" + host + "/api/terminal/groups/save",
          data
        );
        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
    async saveItem(store, data) {
      try {
        await axios.post(
          "https://" + host + "/api/terminal/items/save",
          data
        );
        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
    async saveMod(store, data) {
      try {
        await axios.post(
          "https://" + host + "/api/terminal/mods/save",
          data
        );
        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
    async saveHelper(store, data) {
      try {
        await axios.post(
          "https://" + host + "/api/kiosk/helpers/save",
          data
        );
        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
    async saveUser(store, data) {
      try {
        await axios.post(
          "https://" + host + "/api/terminal/users/save",
          data
        );
        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
    async saveSmena(store, data) {
      try {
        await axios.post(
          "https://" + host + "/api/terminal/smena/save",
          data
        );
        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
    async getLastSmena() {
      try {
        const smena = await axios.get(
          "https://" + host + "/api/terminal/smena/get"
        );
        return smena.data;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
    async commandKiosk(store, {item, command}) {
      try {
        const result = await axios.get(
          `https://${host}/api/terminal/kiosks/set/${item.name}/${command}`
        );
        return result;
      } catch (e) {
        console.log(e);
        return false;
      }
    }
  }
};

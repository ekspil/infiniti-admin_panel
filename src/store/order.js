import axios from "axios";
const host = "terminal-api.rb24.ru"

export default {
  state: {
  },
  actions: {
    async getOrders({ dispatch, commit }) {
      try {
        const result = await axios.get("https://"+host+"/api/terminal/order/all");
        return result.data
      } catch (e) {
        console.log(dispatch, commit);
        throw e;
      }
    },
    async updateOrder({ dispatch, commit }, data) {
      try {
        const result = await axios.post("https://"+host+"/api/terminal/order/change", data);
        return result.data
      } catch (e) {
        console.log(dispatch, commit);
        throw e;
      }
    },
    async sendStatus({ dispatch, commit }, data) {
      try {
        const result = await axios.post("https://"+host+"/api/terminal/order/sendStatus", data);
        console.log(result.data)
        return result.data
      } catch (e) {
        console.log(dispatch, commit);
        throw e;
      }
    },
    async updateOrderHidden({ dispatch, commit }, data) {
      try {
        const result = await axios.post("https://"+host+"/api/terminal/order/changeHidden", data);
        return result.data
      } catch (e) {
        console.log(dispatch, commit);
        throw e;
      }
    },
    async setReadyItem({ dispatch, commit }, data) {
      try {
        const result = await axios.post("https://"+host+"/api/terminal/order/setReadyItem", data);
        return result.data
      } catch (e) {
        console.log(dispatch, commit);
        throw e;
      }
    },
    async setOrderScreen({ dispatch, commit }, data) {
      try {
        const result = await axios.post("https://"+host+"/api/terminal/order/setOrderScreen", data);
        return result.data
      } catch (e) {
        console.log(dispatch, commit);
        throw e;
      }
    },
    async setDieItem({ dispatch, commit }, data) {
      try {
        const result = await axios.post("https://"+host+"/api/terminal/order/setDieItem", data);
        return result.data
      } catch (e) {
        console.log(dispatch, commit);
        throw e;
      }
    },
    async getItems({ dispatch, commit }) {
      try {
        const result = await axios.get("https://"+host+"/api/terminal/order/allItems");
        return result.data
      } catch (e) {
        console.log(dispatch, commit);
        throw e;
      }
    },
  }
};

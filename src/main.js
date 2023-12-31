import Vue from "vue";
import Vulidate from "vuelidate";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "materialize-css/dist/js/materialize.min";
import dateFilter from "@/filters/date.filter";
import "./registerServiceWorker";
import VueSocketIO from "vue-socket.io";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import locale from "element-ui/lib/locale/lang/ru-RU";
Vue.use(ElementUI, { locale });

Vue.use(
  new VueSocketIO({
    debug: true,
    connection: "https://api.rb24.ru",
    vuex: {
      store,
      actionPrefix: "SOCKET_",
      mutationPrefix: "SOCKET_"
    },
    options: {
      path: "/io",
      rejectUnauthorized: false
    } //Optional options
  })
);

Vue.filter("date", dateFilter);
Vue.config.productionTip = false;
Vue.use(Vulidate);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

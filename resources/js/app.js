import Vue from "vue";
import App from "./components/App.vue";
import Axios from "axios";
import Notifications from 'vue-notification'

import router from "./router";
import store from "./store";
require("./bootstrap");

Vue.prototype.$http = Axios;
const token = localStorage.getItem("token");

Vue.use(Notifications)

if (token) {
    Vue.prototype.$http.defaults.headers.common["Authorization"] = token;
}

Vue.config.productionTip = false;

const app = new Vue({
    el: "#app",
    render: h => h(App),
    router,
    store
});

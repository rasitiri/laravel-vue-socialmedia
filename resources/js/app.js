import Vue from "vue";
import Axios from "axios";
import Notifications from "vue-notification";
import moment from "moment";
import infiniteScroll from "vue-infinite-scroll";
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();

import router from "./router";
import store from "./store";
import App from "./components/App.vue";

moment.locale("en");
Vue.prototype.$http = Axios;
Vue.prototype.moment = moment;

const token = localStorage.getItem("token");

Vue.use(Notifications);
Vue.use(infiniteScroll);

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

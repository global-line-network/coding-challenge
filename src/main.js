import Vue from "vue";
import App from "./App.vue";

// fontawesome
import "@fortawesome/fontawesome-free/css/all.css";
import '@fortawesome/fontawesome-free/js/all'

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");

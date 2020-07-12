import Vue from "vue";
import App from "./App.vue";

// -- fontawesome --
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
// import { faSpinner } from '@fortawesome/free-regular-svg-icons';
import {
  faTrash,
  faPencilAlt,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

library.add(faTrash, faPencilAlt, faPlus);
Vue.component("font-awesome-icon", FontAwesomeIcon);
// !-- fontawesome --!

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");

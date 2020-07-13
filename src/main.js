import Vue from "vue";
import App from "./App.vue";

import VueLazyLoad from "vue-lazyload";
import VModal from "vue-js-modal";

// -- fontawesome --
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faTrash,
  faPencilAlt,
  faPlus,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

library.add(faTrash, faPencilAlt, faPlus, faTimes);
Vue.component("font-awesome-icon", FontAwesomeIcon);
// !-- fontawesome --!

// -- lazyload --
Vue.use(VueLazyLoad);
// !-- lazyload --!

// -- modal --
Vue.use(VModal);
// !-- modal --!

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");

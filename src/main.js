import Vue from "vue";
import App from "./App.vue";

import VueLazyLoad from "vue-lazyload";
import VModal from "vue-js-modal";
import VueSimpleAlert from "vue-simple-alert";

// -- fontawesome --
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faTrash,
  faPencilAlt,
  faPlus,
  faTimes,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";

library.add(faTrash, faPencilAlt, faPlus, faTimes, faSpinner);
Vue.component("font-awesome-icon", FontAwesomeIcon);
// !-- fontawesome --!

// -- lazyload --
Vue.use(VueLazyLoad);

// -- modal --
Vue.use(VModal);

// -- VueSimpleAlert --
Vue.use(VueSimpleAlert);
// -- VueSimpleAlert --

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");

<template>
<modal class="container-modal" name="vue-modal">
  <header>
    <button @click="hide" class="btn btn-sm btn-danger">
      <font-awesome-icon :icon="['fas', 'times']" />
    </button>

    <slot name="modal-header" />
  </header>
  <body>
    <slot name="modal-body" />
  </body>
  <footer>
    <footer>
      <slot name="modal-footer" />
    </footer>
  </footer>
</modal>
</template>

<script>
import "./style.scss";

export default {
  name: "ModalContent",
  methods: {
    hide() {
      this.$modal.hide("vue-modal");
    }
  }
};
</script>
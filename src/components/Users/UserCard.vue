<template>
  <div
    class="container-user-card row"
    v-lazy-container="{selector: 'img', loading: 'https://www.jettools.com/images/animated_spinner.gif'}"
  >
    <!-- modal -->
    <ModalContent>
      <template v-slot:modal-header>
        <p class="mt-3 text-center lead font-weight-bold">New User</p>
      </template>
      <template v-slot:modal-body>
        <UserForm />
      </template>
      <template v-slot:modal-footer></template>
    </ModalContent>
    <!-- !--modal--! -->

    <div class="container-user-create">
      <button @click="show" class="btn btn-primary btn-user-create">
        <font-awesome-icon :icon="['fas', 'plus']" />
        <span>Create User</span>
      </button>
    </div>

    <div v-for="user in userList" :key="user.id" class="card col-xs-8 col-sm-6 col-md-2">
      <div class="card-body">
        <div class="card-user-img">
          <img
            class="user-card-img-top"
            v-bind:data-src="user.avatar"
            v-bind:alt="`${user.first_name} ${user.last_name}`"
          />
        </div>
        <div class="card-user-info">
          <input
            disabled
            placeholder="Name"
            type="text"
            class="card-title user-info-name"
            maxlength="16"
            :value="user.first_name + ' ' +  user.last_name"
          />

          <input
            disabled
            placeholder="Registered Date"
            type="text"
            class="card-title user-info-date"
            maxlength="16"
            :value="'12/14/2019'"
          />
        </div>
        <div class="card-user-actions">
          <button class="btn btn-default btn-user-edit">
            <font-awesome-icon :icon="['fas', 'pencil-alt']" />
          </button>
          <button class="btn btn-default circle btn-user-edit">
            <font-awesome-icon :icon="['fas', 'trash']" />
          </button>
        </div>
      </div>
    </div>

    <i aria-hidden="true"></i>
    <i aria-hidden="true"></i>
    <i aria-hidden="true"></i>
    <i aria-hidden="true"></i>
    <i aria-hidden="true"></i>
  </div>
</template>

<script>
import "./style.scss";
import UserForm from "./UserForm";
import ModalContent from "../Modal/index";

export default {
  name: "UserCard",
  components: {
    ModalContent,
    UserForm
  },
  props: ["userList"],
  methods: {
    show() {
      this.$modal.show("vue-modal");
    }
  }
};
</script>
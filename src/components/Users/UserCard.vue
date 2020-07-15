<template>
  <div class="container-users">
    <!-- modal -->
    <ModalContent>
      <template v-slot:modal-header>
        <p class="mt-3 text-center lead font-weight-bold">New User</p>
      </template>
      <template v-slot:modal-body>
        <UserForm />
      </template>
      <template v-slot:modal-footer>
        
      </template>
    </ModalContent>
    <!-- !--modal--! -->

    <!-- modal buttons -->
    <div class="container-user-create">
      <button @click="show" class="btn btn-primary btn-user-create">
        <font-awesome-icon :icon="['fas', 'plus']" />
        <span>Create User</span>
      </button>
    </div>
    <!-- !--modal buttons--! -->
    <div
      class="container-user-card row"
      v-lazy-container="{selector: 'img', loading: 'https://www.jettools.com/images/animated_spinner.gif'}"
    >
      <div
        v-for="user in userList"
        :key="user.id"
        :data-id="user.id"
        class="card col-xs-8 col-sm-6 col-md-2"
      >
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
              :value="`${user.first_name} ${user.last_name}`"
            />

            <input
              disabled
              placeholder="Registered Date"
              type="text"
              class="card-title user-info-date"
              maxlength="16"
              :value="user.createdAt"
            />
          </div>
          <div class="card-user-actions">
            <button class="btn btn-default btn-user-edit">
              <font-awesome-icon :icon="['fas', 'pencil-alt']" />
            </button>
            <button @click="removeUser" class="btn btn-default circle btn-user-remove">
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
  </div>
</template>

<script>
import "./style.scss";
import UserForm from "./UserForm";
import ModalContent from "../Modal/index";

import { user } from "../../store";

import { deleteUser } from "../../api/users";

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
    },
    hide() {
      this.$modal.hide("vue-modal");
    },
    removeUser(e) {
      let username = e.target.closest(".card").querySelector(".user-info-name")
        .value;

      let userID = e.target.closest(".card").dataset.id;

      this.$confirm(`Confirm to delete user [${username}] ?`).then(() => {
        // api callback for backend
        deleteUser();

        // update state from store
        user.list = user.list.filter(user => user.id != userID);
      });
    }
  }
};
</script>
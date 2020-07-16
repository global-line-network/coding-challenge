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
      <template v-slot:modal-footer></template>
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
              :disabled="userEdit == 0"
              placeholder="Name"
              type="text"
              class="card-title user-info-name"
              maxlength="16"
              :value="`${user.first_name} ${user.last_name}`"
            />

            <datepicker
              :readonly="true"
              format="MM/D/YYYY"
              class="card-title user-info-date"
              name="user-info-date"
              :value="user.createdAt"
              :input-attr="{ 'data-createdAt': user.createdAt, 'disabled': userEdit == 0 }"
            />
          </div>
          <div class="card-user-actions">
            <div class="container-user-actions">
              <button @click="editUser" class="btn btn-default btn-user-edit">
                <font-awesome-icon :icon="['fas', 'pencil-alt']" />
              </button>
              <button @click="removeUser" class="btn btn-default circle btn-user-remove">
                <font-awesome-icon :icon="['fas', 'trash']" />
              </button>
            </div>

            <div class="container-user-actions-save foreground">
              <button @click="saveUser" class="btn btn-default btn-user-edit">
                <font-awesome-icon :icon="['fas', 'check']" />
              </button>
              <button @click="editComplete" class="btn btn-default circle btn-user-edit-cancel">
                <font-awesome-icon :icon="['fas', 'times']" />
              </button>
            </div>
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
import { updateUser, deleteUser } from "../../api/users";
import { user } from "../../store";
import Utils from "./utils";
import datepicker from "vue-date-picker";

import UserForm from "./UserForm";
import ModalContent from "../Modal/index";

export default {
  name: "UserCard",
  components: {
    ModalContent,
    UserForm,
    datepicker
  },
  data() {
    return {
      usersList: []
    };
  },
  computed: {
    userEdit() {
      return user.edit;
    }
  },
  props: ["userList"],
  methods: {
    show() {
      this.$modal.show("vue-modal");
    },
    editUser(e) {
      if (!user.edit) {
        let el = e.target.closest(".card-user-actions");
        el.querySelector(".container-user-actions").classList.add("foreground");
        el.querySelector(".container-user-actions-save").classList.remove(
          "foreground"
        );

        e.target
          .closest(".card")
          .querySelectorAll("input")
          .forEach((el, index) => {
            el.removeAttribute("disabled");
            index === 0 && el.focus();
          });
      }
    },
    editComplete(e, updatedUser) {
      let el = e.target.closest(".card-user-actions");
      el.querySelector(".container-user-actions").classList.remove(
        "foreground"
      );
      el.querySelector(".container-user-actions-save").classList.add(
        "foreground"
      );

      e.target
        .closest(".card")
        .querySelectorAll("input")
        .forEach(el => el.setAttribute("disabled", "disabled"));

      if (updatedUser) {
        user.list.map(u => {
          if (u.id == updatedUser.userID) {
            u.first_name = Utils.nameTrim(updatedUser.userInputName).firstName;
            u.last_name = Utils.nameTrim(updatedUser.userInputName).lastName;
            u.createdAt = updatedUser.userInputDate;
          }
        });
      }

      updateUser();
    },
    saveUser(e) {
      let userID = e.target.closest(".card").dataset.id;
      let userInputName = e.target
        .closest(".card")
        .querySelector(".user-info-name").value;
      let userInputDate = e.target
        .closest(".card")
        .querySelector(".user-info-date").value;

      let updatedUser = { userID, userInputName, userInputDate };

      this.editComplete(e, updatedUser);
    },
    removeUser(e) {
      let username = e.target.closest(".card").querySelector(".user-info-name")
        .value;

      let userID = e.target.closest(".card").dataset.id;

      this.$confirm(`Confirm to delete user [${username}] ?`).then(() => {
        deleteUser();

        user.list = Utils.sortUser(
          user.list.filter(user => user.id != userID),
          "asc"
        );
      });
    }
  }
};
</script>
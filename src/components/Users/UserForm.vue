<template>
  <div class="container-user-form">
    <form
      id="form-createUser"
      class="input-group mb-3"
      ref="formCreateUser"
      @submit.prevent="addUser"
    >
      <div class="container-prepend">
        <div class="input-group-prepend">
          <span class="input-group-text">First Name</span>
        </div>
        <input
          type="text"
          id="firstName"
          name="firstName"
          class="form-control"
          aria-label="First name"
          maxlength="7"
          ref="first_name"
        />
      </div>

      <div class="container-prepend">
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text">Last Name</span>
          </div>
          <input
            type="text"
            id="lastName"
            name="lastName"
            class="form-control"
            aria-label="Last name"
            maxlength="7"
            ref="last_name"
          />
        </div>
      </div>

      <div class="modal-actions">
        <button type="submit" class="btn btn-success d-flex ml-auto">
          <font-awesome-icon :icon="['fas', 'spinner']" :class="createSpinner" class="fa-spin" />
          {{createText}}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { user, spinner } from "../../store";
import { createUser, getAvatar } from "../../api/users";
import Utils from "./utils";

export default {
  name: "UserForm",
  computed: {
    createText: () => spinner.createUserBtn.text,
    createSpinner: () => spinner.createUserBtn.spinner
  },
  methods: {
    async addUser() {
      let userData = {
        first_name: this.$refs.first_name.value,
        last_name: this.$refs.last_name.value
      };

      if (
        userData.first_name.trim().length < 1 ||
        userData.last_name.trim().length < 1
      ) {
        this.$alert("First name or last name can not be empty", "", "info");
      } else {
        spinner.createUserBtn.text = "";
        spinner.createUserBtn.spinner = "";
        let response = await createUser(userData);

        if (response.status === 2000 || response.status === 201) {
          let avatar = await getAvatar("Male");
          avatar = avatar.data.results[0].picture.medium;

          this.$fire({
            title: "User Created",
            text: "",
            type: "success",
            timer: 3000
          }).then(() => this.$modal.hide("vue-modal"));

          user.list = [
            ...user.list,
            {
              id: response.data.id,
              avatar,
              first_name: response.data.userData.first_name,
              last_name: response.data.userData.last_name,
              createdAt: Utils.dateTrim(response.data.createdAt)
            }
          ];

          spinner.createUserBtn.text = "Create";
          spinner.createUserBtn.spinner = "fade";
        } else {
          this.$alert(
            "Please refresh the page and try again",
            `Error Status: <b class="text-danger">${response.status}</b>`,
            "error"
          ).then(() => this.$modal.hide("vue-modal"));
        }
      }
    }
  }
};
</script>
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
          maxlength="16"
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
            maxlength="16"
            ref="last_name"
          />
        </div>
      </div>

      <div class="modal-actions">
        <button type="submit" class="btn btn-success d-flex ml-auto">Create</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "UserForm",
  methods: {
    async addUser() {
      this.$refs.first_name.value.trim().length;
      // let form = this.$refs.formCreateUser;
      // form.submit();

      // let newUser = await createUser({
      //   first_name: "John",
      //   last_name: "Doe"
      // });
      // console.log(newUser.user.first_name)
      console.log("submitted");
    }
  }
};
</script>
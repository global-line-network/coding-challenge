<template>
  <div class="container-user-form">
    <div class="input-group mb-3">
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
      />

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
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserForm"
};
</script>
<template>
  <div class="container-users">
    <button class="btn btn-primary btn-user-create">
      <i class="fa fa-plus" aria-hidden="true"></i>
      <span>Create User</span>
    </button>
  </div>
</template>

<script>
import { fetchUsers } from "../../api/users";
import "./style.scss";

export default {
  name: "Users",
  methods: {
    getUsers: async () => {
      let users = await fetchUsers();
      console.log(users);
    }
  }
};
</script>
<template>
  <div class="container-users">
    <UserCard :userList="userList" />
  </div>
</template>

<script>
import "./style.scss";

import { fetchUsers } from "../../api/users";
import { user } from "../../store";

import UserCard from "./UserCard";

export default {
  name: "Users",
  components: {
    UserCard
  },
  methods: {
    getUsers: () => fetchUsers()
  },
  computed: {
    userList() {
      return user.list;
    }
  },
  async mounted() {
    let users = await this.getUsers();
    let { data } = users;

    user.list = [...user.list, ...data];
  }
};
</script>
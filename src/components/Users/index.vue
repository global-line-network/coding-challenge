<template>
  <div class="container-users">
    <UserCard :userList="userList" />
  </div>
</template>

<script>
import { fetchUsers } from "../../api/users";
import "./style.scss";

import UserCard from "./UserCard";

export default {
  name: "Users",
  components: {
    UserCard
  },
  methods: {
    getUsers: () => fetchUsers()
  },
  data() {
    return {
      userList: []
    };
  },
  async mounted() {
    let userData = await this.getUsers();
    this.userList = userData.data;
  }
};
</script>
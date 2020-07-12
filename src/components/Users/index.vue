<template>
  <div class="container-users">
    <UserCard />
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
    getUsers: async () => {
      let users = await fetchUsers();
      console.log(users);
    }
  }
};
</script>
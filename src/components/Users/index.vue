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
    let { data } = users.data;
    console.log(data)

    user.list = [...user.list, ...data];

    user.list.map(u => {
      !Object.keys(u).includes('createdAt') && (u.createdAt = "12/14/2019")
    });
  }
};
</script>
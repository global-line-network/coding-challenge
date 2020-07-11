<template>
  <div class="container-main">
    <NavBar />
    <h1 class="mt-5">{{pageTitle}}</h1>
    <Users />
  </div>
</template>

<script>
import "./style.scss";

import NavBar from "../../components/NavBar/index";
import Users from "../../components/Users/index";

export default {
  name: "Main",
  data: () => {
    return {
      pageTitle: "User Accounts"
    };
  },
  components: {
    NavBar,
    Users
  }
};
</script>
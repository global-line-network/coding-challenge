<template>
  <div class="container-main">
    <NavBar />
    <div class="container-body">
      <h1>User Accounts</h1>
      <Users />
    </div>
  </div>
</template>

<script>
import "./style.scss";

import NavBar from "../../components/NavBar/index";
import Users from "../../components/Users/index";

export default {
  name: "Main",
  components: {
    NavBar,
    Users
  }
};
</script>
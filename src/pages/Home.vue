<template>
  <div class="container">
    <v-container class="d-flex flex-column">
      <v-row class="d-flex">
        <img
          alt="GlobalLine logo"
          src="../assets/logo.png"
          class="logo"
          style="padding: 0.5rem 1rem"
        />
      </v-row>
      <v-row style="padding: 0.5rem 1rem">
        <h1>User Accounts</h1>
      </v-row>
      <v-row style="padding: 0.5rem 1rem">
        <v-btn color="blue" class="add-button" rounded>
          <v-icon color="white"> mdi-plus </v-icon>
          <span style="color: white">Create New</span>
        </v-btn>
      </v-row>
      <v-row class="">
        <v-col col="12" md="6" lg="4">
          <!-- Only display odd number id -->
          <UserPanel
            v-for="user in users.filter((user) => user.id % 2 !== 0)"
            :key="user.id"
            :id="user.id"
            :email="user.email"
            :first_name="user.first_name"
            :last_name="user.last_name"
            :avatar="user.avatar"
          ></UserPanel>
        </v-col>
        <br />
        <v-col col="12" md="6" lg="4">
          <!-- Only display even number id -->
          <UserPanel
            v-for="user in users.filter((user) => user.id % 2 === 0)"
            :key="user.id"
            :id="user.id"
            :email="user.email"
            :first_name="user.first_name"
            :last_name="user.last_name"
            :avatar="user.avatar"
          ></UserPanel>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import UserPanel from "../components/UserPanel.vue";
export default {
  components: { UserPanel },
  data() {
    return {
      users: [
        {
          id: 1,
          email: "michael.lawson@reqres.in",
          first_name: "Michael",
          last_name: "Lawson",
          avatar: "https://reqres.in/img/faces/7-image.jpg",
        },
        {
          id: 2,
          email: "michael.lawson@reqres.in",
          first_name: "Michael",
          last_name: "Lawson",
          avatar: "https://reqres.in/img/faces/7-image.jpg",
        },
        {
          id: 3,
          email: "michael.lawson@reqres.in",
          first_name: "Michael",
          last_name: "Lawson",
          avatar: "https://reqres.in/img/faces/7-image.jpg",
        },
        {
          id: 4,
          email: "michael.lawson@reqres.in",
          first_name: "Michael",
          last_name: "Lawson",
          avatar: "https://reqres.in/img/faces/7-image.jpg",
        },
        {
          id: 5,
          email: "michael.lawson@reqres.in",
          first_name: "Michael",
          last_name: "Lawson",
          avatar: "https://reqres.in/img/faces/7-image.jpg",
        },
        {
          id: 6,
          email: "michael.lawson@reqres.in",
          first_name: "Michael",
          last_name: "Lawson",
          avatar: "https://reqres.in/img/faces/7-image.jpg",
        },
      ],
    };
  },
};
</script>

<style scoped>
h1 {
  text-align: start;
  font-size: 40px;
}
.container {
  margin-top: 1rem;
  padding: 0 5rem 0;
}
.logo {
  width: 200px;
}
</style>
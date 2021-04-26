<template>
  <div class="container">
    <v-container>
      <img alt="GlobalLine logo" src="../assets/logo.png" class="logo" />
      <v-row>
        <h1>User Accounts</h1>
      </v-row>
      <v-row>
        <v-btn color="blue" class="add-button" rounded="lg">
          <v-icon color="white"> mdi-plus </v-icon>
          <span style="color:white">Create New</span>
        </v-btn>
      </v-row>
      <v-row>
        <v-col col="12" md="6">
          <UserPanel
            v-for="user in users"
            :key="user.id"
            :id="user.id"
            :email="user.email"
            :first_name="user.first_name"
            :last_name="user.last_name"
            :avatar="user.avatar"
          ></UserPanel>
        </v-col>
        <br />
        <v-col col="12" md="6">
          <UserPanel
            v-for="user in users"
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
  margin: 0.5rem 2rem 0;
  padding: 0 8rem 0;
}
.logo {
  width: 200px;
}
</style>
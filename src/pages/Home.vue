<template>
  <div class="container">
    <v-container class="d-flex flex-column">
      <v-row class="d-flex">
        <a href="https://globalline.my/" target="_blank">
          <img
            alt="GlobalLine logo"
            src="../assets/logo.png"
            class="logo"
            style="padding: 0.5rem 1rem"
          />
        </a>
      </v-row>
      <v-row style="padding: 0.5rem 1rem">
        <h1>User Accounts</h1>
      </v-row>
      <v-row style="padding: 0.5rem 1rem">
        <v-btn
          color="blue"
          class="add-button"
          rounded
          @click="create"
          v-if="!isCreate"
        >
          <v-icon color="white"> mdi-plus </v-icon>
          <span style="color: white">Create New</span>
        </v-btn>
        <v-btn color="blue" rounded @click="create" v-else>
          <span style="color: white">Cancel</span>
        </v-btn>
      </v-row>
      <v-row justify="center" v-if="errorMessage">
        <span style="color: red" @click="resetError"
          >We are sorry. {{ errorMessage }} Click me to close this message</span
        >
      </v-row>
      <v-row v-if="isCreate">
        <UserPanel :isCreate="true" @quitCreate="create"></UserPanel>
      </v-row>
      <v-row v-if="!isLoading">
        <v-col col="12" md="6" lg="4">
          <!-- Only display odd number id -->
          <div v-for="user in fetchUsersOdd" :key="user.id">
            <UserPanel
              :id="user.id"
              :email="user.email"
              :first_name="user.first_name"
              :avatar="user.avatar"
            ></UserPanel>
          </div>
        </v-col>
        <br />
        <v-col col="12" md="6" lg="4">
          <!-- Only display even number id -->
          <div v-for="user in fetchUsersEven" :key="user.id">
            <UserPanel
              :id="user.id"
              :email="user.email"
              :first_name="user.first_name"
              :avatar="user.avatar"
            ></UserPanel>
          </div>
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
      isCreate: false,
    };
  },
  methods: {
    create() {
      console.log(this.isCreate);
      this.isCreate = !this.isCreate;
    },
    resetError() {
      this.$store.dispatch("resetError");
    },
  },
  computed: {
    fetchUsersOdd() {
      const data = this.$store.getters.getUsers;
      return data.filter((user) => user.id % 2 !== 0);
    },
    fetchUsersEven() {
      const data = this.$store.getters.getUsers;
      return data.filter((user) => user.id % 2 === 0);
    },
    isLoading() {
      return this.$store.getters.isLoading;
    },
    errorMessage() {
      return this.$store.getters.getErrorMessage;
    },
  },
  mounted() {
    this.$store.dispatch("fetchUsers");
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
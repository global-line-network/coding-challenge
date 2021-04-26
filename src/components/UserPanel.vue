<template>
  <div class="card-container">
    <v-card elevation="2" rounded="lg">
      <v-list-item two-line>
        <img alt="Vue logo" :src="avatar" class="logo" />
        <v-list-item-content>
          <v-list-item-title class="name-text">
            <span style="font-weight: bold;">{{ first_name }}</span> {{ last_name }}
          </v-list-item-title>
          <v-list-item-subtitle class="email-text">{{
            email
          }}</v-list-item-subtitle>
        </v-list-item-content>
        <div>
          <v-row>
            <v-icon>mdi-circle-edit-outline</v-icon>
          </v-row>
          <v-row>
            <v-icon>mdi-delete</v-icon>
          </v-row>
        </div>
      </v-list-item>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ["id", "email", "first_name", "last_name", "avatar"],
};
</script>

<style scoped>
img {
  border-radius: 50%;
  width: 80px;
  margin: auto;
  padding: 5px;
}
.card-container {
  width: 350px;
  padding: 5px 10px;
}
.name-text {
  font-size: 20px;
}
.email-text {
  font-size: 15px;
}
</style>
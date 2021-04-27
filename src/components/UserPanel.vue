<template>
  <div class="card-container">
    <v-card
      elevation="1"
      rounded="lg"
      @mouseover="isHovered = true"
      @mouseleave="isHovered = false"
    >
      <v-list-item two-line>
        <img alt="avatar" :src="avatar" class="img" />
        <v-list-item-content>
          <v-list-item-title class="name-text">
            <span style="font-weight: bold">{{ first_name }}</span>
            {{ last_name }}
          </v-list-item-title>
          <v-list-item-subtitle class="email-text">{{
            email
          }}</v-list-item-subtitle>
        </v-list-item-content>
        <div v-if="isHovered">
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
  data() {
    return {
      isHovered: false,
    };
  },
  computed: {},
};
</script>

<style scoped>
img {
  border-radius: 50%;
  width: 60px;
  padding: 5px;
}
.card-container {
  width: 300px;
  padding: 5px 10px;
}
.name-text {
  font-size: 18px;
}
.email-text {
  font-size: 13px;
}
</style>
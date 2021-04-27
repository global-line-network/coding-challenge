<template>
  <div class="card-container">
    <v-card
      elevation="1"
      rounded="lg"
      @mouseenter="setHovered"
      @mouseleave="setHovered"
    >
      <v-list-item two-line>
        <div v-if="avatar">
          <img alt="avatar" :src="avatar" class="img" />
        </div>
        <v-list-item-content v-if="isEdit || isCreate">
          <input
            type="text"
            id="first_name"
            ref="first_name"
            :value="first_name"
          />
          <input type="text" id="email" ref="email" :value="email" />
        </v-list-item-content>
        <v-list-item-content v-else>
          <v-list-item-title class="name-text">
            <span style="font-weight: bold">{{ first_name }}</span>
          </v-list-item-title>
          <v-list-item-subtitle class="email-text">{{
            email
          }}</v-list-item-subtitle>
        </v-list-item-content>
        <div v-if="isHovered && !isEdit && !isCreate">
          <v-row>
            <v-icon @click="edit">mdi-circle-edit-outline</v-icon>
          </v-row>
          <v-row>
            <v-icon @click="deleteUser">mdi-delete</v-icon>
          </v-row>
        </div>
        <div v-if="isEdit || isCreate">
          <v-row>
            <v-icon @click="createOrUpdate" color="green"
              >mdi-check-bold</v-icon
            >
          </v-row>
          <v-row>
            <v-icon @click="edit" color="red">mdi-close</v-icon>
          </v-row>
        </div>
      </v-list-item>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ["id", "email", "first_name", "avatar", "isCreate"],
  data() {
    return {
      isHovered: false,
      isEdit: false,
    };
  },
  computed: {},
  methods: {
    createOrUpdate() {
      let id = null;
      if (this.isEdit) {
        id = this.id;
      }
      const payload = {
        email: this.$refs.email.value,
        first_name: this.$refs.first_name.value,
        id: id,
      };
      this.$store.dispatch("createOrUpdateUser", payload);
      this.isEdit = !this.isEdit;
    },
    edit() {
      this.isEdit = !this.isEdit;
      if (this.isCreate) {
        this.$emit("quitCreate");
      }
    },
    deleteUser() {
      this.$store.dispatch("deleteUser", this.id);
    },
    setHovered() {
      if (!this.isEdit && !this.isCreate) {
        this.isHovered = !this.isHovered;
      }
    },
  },
};
</script>

<style scoped>
img {
  border-radius: 50%;
  width: 60px;
  padding: 5px;
}
input {
  border-bottom: 1px solid lightgrey;
  margin-right: 2rem;
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
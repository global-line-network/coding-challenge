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
        <!-- Show blank avatar for create -->
        <div v-else-if="!isCreate">
          <img alt="avatar" src="../assets/blankAvatar.png" class="img" />
        </div>

        <!-- For Creating and Editing -->
        <v-list-item-content v-if="isEdit || isCreate">
          <input type="hidden" id="user_id" ref="userId" :value="id" />
          <input
            type="text"
            id="first_name"
            ref="first_name"
            :value="first_name"
            @keyup.enter="createOrUpdate"
          />
          <input
            type="text"
            id="email"
            ref="email"
            :value="email"
            @keyup.enter="createOrUpdate"
          />
        </v-list-item-content>

        <!-- Displaying the content -->
        <v-list-item-content v-else>
          <input type="hidden" id="user_id" name="userId" :value="id" />
          <v-list-item-title class="name-text">
            <span style="font-weight: bold">{{ first_name }}</span>
          </v-list-item-title>
          <v-list-item-subtitle class="email-text">{{
            email
          }}</v-list-item-subtitle>
        </v-list-item-content>

        <!-- Show edit and delete button -->
        <div v-if="isHovered && !isEdit && !isCreate">
          <v-row>
            <v-icon @click="edit">mdi-circle-edit-outline</v-icon>
          </v-row>
          <v-row>
            <v-icon @click="deleteUser">mdi-delete</v-icon>
          </v-row>
        </div>

        <!-- Show confirm or cancel button (while editting or creating) -->
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
        id: this.$refs.userId.value,
      };
      this.$store.dispatch("createOrUpdateUser", payload);

      if (this.isHovered && this.isEdit) this.isHovered = false; //to fix the bug if user's mouse pointing and enter key is hit at the same time
      this.edit();
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
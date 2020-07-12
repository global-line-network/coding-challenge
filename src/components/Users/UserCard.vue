<template>
  <div class="container-user-card row" v-lazy-container="{selector: 'img', loading: 'https://www.jettools.com/images/animated_spinner.gif'}">
    <div class="container-user-create">
      <button class="btn btn-primary btn-user-create">
        <font-awesome-icon :icon="['fas', 'plus']" />
        <span>Create User</span>
      </button>
    </div>

    <div v-for="user in userList" :key="user.id" class="card col-xs-8 col-sm-6 col-md-2">
      <div class="card-body">
        <div class="card-user-img">
          <img
            class="user-card-img-top"
            v-bind:data-src="user.avatar"
            v-bind:alt="`${user.first_name} ${user.last_name}`"
          />
        </div>
        <div class="card-user-info">
          <h5 class="card-title user-info-name">{{`${user.first_name} ${user.last_name}`}}</h5>
          <p class="card-text user-info-date">12/14/2019</p>
        </div>
        <div class="card-user-actions">
          <button class="btn btn-default btn-user-edit">
            <font-awesome-icon :icon="['fas', 'pencil-alt']" />
          </button>
          <button class="btn btn-default circle btn-user-edit">
            <font-awesome-icon :icon="['fas', 'trash']" />
          </button>
        </div>
      </div>
    </div>

    <i aria-hidden="true"></i>
    <i aria-hidden="true"></i>
    <i aria-hidden="true"></i>
    <i aria-hidden="true"></i>
    <i aria-hidden="true"></i>
  </div>
</template>

<script>
import "./style.scss";

export default {
  name: "UserCard",
  props: ["userList"]
};
</script>
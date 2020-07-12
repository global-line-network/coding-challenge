<template>
  <div class="container-user-card row">
    <div class="container-user-create">
      <button class="btn btn-primary btn-user-create">
        <font-awesome-icon :icon="['fas', 'plus']" />
        <span>Create User</span>
      </button>
    </div>

    <div class="card col-xs-8 col-sm-6 col-md-3">
      <div class="card-body">
        <div class="card-user-img">
          <img
            class="user-card-img-top"
            src="https://static-cdn.jtvnw.net/jtv_user_pictures/75984cfd-6af8-4975-aa84-ddc57dc83258-profile_image-70x70.png"
            alt="Card image cap"
          />
        </div>
        <div class="card-user-info">
          <h5 class="card-title user-info-name">Chris Ng</h5>
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

    <div class="card col-xs-8 col-sm-6 col-md-3">
      <div class="card-body">
        <div class="card-user-img">
          <img
            class="user-card-img-top"
            src="https://static-cdn.jtvnw.net/jtv_user_pictures/75984cfd-6af8-4975-aa84-ddc57dc83258-profile_image-70x70.png"
            alt="Card image cap"
          />
        </div>
        <div class="card-user-info">
          <h5 class="card-title user-info-name">Chris Ng</h5>
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

    <div class="card col-xs-8 col-sm-6 col-md-3">
      <div class="card-body">
        <div class="card-user-img">
          <img
            class="user-card-img-top"
            src="https://static-cdn.jtvnw.net/jtv_user_pictures/75984cfd-6af8-4975-aa84-ddc57dc83258-profile_image-70x70.png"
            alt="Card image cap"
          />
        </div>
        <div class="card-user-info">
          <h5 class="card-title user-info-name">Chris Ng</h5>
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

    <div class="card col-xs-8 col-sm-6 col-md-3">
      <div class="card-body">
        <div class="card-user-img">
          <img
            class="user-card-img-top"
            src="https://static-cdn.jtvnw.net/jtv_user_pictures/75984cfd-6af8-4975-aa84-ddc57dc83258-profile_image-70x70.png"
            alt="Card image cap"
          />
        </div>
        <div class="card-user-info">
          <h5 class="card-title user-info-name">Chris Ng</h5>
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
  </div>
</template>

<script>
import "./style.scss";

export default {
  name: "UserCard"
};
</script>
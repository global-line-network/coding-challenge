<template>
  <div id="app" class="container">
    <img alt="Vue logo" class="logo" src="../public/global-line-network.png">
    <div class="row justify-content-between mb-5 mt-5">
        <h3>User Management</h3>
        <button type="button" style="width: auto" class="btn btn-outline-primary custom-btn" data-toggle="modal" data-target="#addContact">
          + Add new user
        </button>
    </div>
    <ContactsList/>
  </div>
</template>

<script>
import ContactsList from './components/ContactsList.vue';

export default {
  name: 'App',
  components: {
    ContactsList
  }
}
</script>

<style>

*{
  box-sizing: border-box;
}

.container{
  max-width: 600px;
  margin: 0 auto;
}

.logo{
  display: block;
  margin: 20px auto;
  height: 75px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
  /* font-size: 20px; */
}
</style>

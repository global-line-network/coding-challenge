<template>
  <div id="app">
    <Main />
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css";

// main screen container
import Main from "./screens/Main/index";

export default {
  name: "App",
  components: {
    Main
  }
};
</script>

<style lang="scss">
@import './styles/library';

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}


#app {
  padding: 0;
  margin: 0;
  width: 100%;
  overflow-x: hidden;

  @media (min-width: $media-desktop) {
    padding: 3em 5em;
  }
}
</style>

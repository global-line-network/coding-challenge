<template>
    <div id="homeView">
        <h2>Hey</h2>
    </div>
</template>

<script>
    export default {
        name: 'home',
        mounted() {
            console.log('Component mounted.')
        }
    }
</script>
<style lang="scss">
    @import 'resources/sass/views/_home.scss';
</style>

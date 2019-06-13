<template>
    <div id="homeView">
        <div id="homeView__header" class="d-flex align-items-center justify-content-start mb-3 mt-3">
            <div id="homeView__header__imageContainer">
                <img src="/images/logo.png" class="img-fluid" alt="">
            </div>
        </div>

        <div id="homeView__control" class="d-flex align-items-start flex-column justify-content-center mb-4">
            <h1 class="mb-4">User Accounts</h1>
            <div class="primaryButtonGlobalLine d-flex align-items-center">
                <v-icon name="plus"/>
                <button @click="createUser()">Create New</button>
            </div>

        </div>

        <div id="homeView__content">
            <div class="row">
                <div v-for="(user, index) in users" :key="index" class="col-xs-12 col-sm-12 col-md-6 col-lg-4 mb-4">
                    <div class="userContainerGlobalLine d-flex">
                        <div class="userContainerImageGlobalLine mr-2">
                            <img :src="'https://api.adorable.io/avatars/250/' + index + '.png'" alt="avatar">
                        </div>
                        <div class="userContainerContentGlobalLine">
                            <div class="mb-1">
                                <input @focusin="activateUser(user, index)" @focusout="deActivateUser(user, index)"
                                       class="txtInputGlobalLine" name="name" :value="user.name" type="text">
                            </div>
                            <div>
                                <input @focusin="activateUser(user, index)" @focusout="deActivateUser(user, index)" class="dateInputGlobalLine" name="date" :value="user.date" type="date">
                            </div>
                        </div>
                        <div class="userContainerActionsGlobalLine d-flex flex-column">
                            <div v-if="!user.active" class="mb-2 inActiveEdit">
                                <v-icon name="pencil-alt"/>
                            </div>
                            <div v-if="!user.active" class="inActiveEdit">
                                <v-icon name="trash"/>
                            </div>
                            <div v-if="user.active" class="mb-2 activeEdit">
                                <v-icon name="check"/>
                            </div>
                            <div v-if="user.active" class="activeDelete">
                                <v-icon name="times"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'home',
        data: function () {
            return {
                users: [],
                editingAction: false,
                error: '',
                created: false,
                updated: false,
                deleted: false
            }
        },
        methods: {
            getUsers() {
                axios.get('/users')
                    .then(response => {
                        this.users = response.data;
                        this.users.forEach((user) => {
                            user.active = false;
                        });
                    })
                    .catch(e => {
                        this.error = e;
                    });

            },
            activateUser(user, index) {

                this.users.map(x => {
                    if (x.id === user.id) {
                        x.active = true;
                        this.$set(this.users, index, x);
                    }
                });
            },
            deActivateUser(user, index) {
                this.users.map(x => {
                    if (x.id === user.id) {
                        x.active = false;
                        this.$set(this.users, index, x);
                    }
                });
            },
            createUser() {
                axios.post('/users/create')
                    .then((response) => {
                        if (response.data.created === true) {
                            this.created = true;
                            this.getUsers();
                        }
                    })
                    .catch((e) => {
                        this.error = e;
                    });
            }

        },
        created() {
            this.getUsers();
        }
    }
</script>
<style lang="scss">
    @import 'resources/sass/views/_home.scss';
</style>

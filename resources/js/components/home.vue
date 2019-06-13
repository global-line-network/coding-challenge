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

        <div v-if="created || updated || deleted" class="alert alert-success alert-dismissible fade show"
             :class="{'alert-success' : created || updated, 'alert-danger' : deleted && !created && !updated}" role="alert">
            <strong v-if="created && !deleted">User created!</strong>
            <strong v-else-if="updated">User updated!</strong>
            <strong v-else-if="deleted && !created && !updated">User deleted!</strong>
            <button @click="created = false; updated = false; deleted = false;" type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
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
                                <input @focusin="activateUser(user, index)" @focusout="checkEnteredValue(user, index)"
                                       @keypress="checkEnteredValue(user, index)"
                                       class="txtInputGlobalLine" name="name" v-model="user.name" type="text">
                            </div>
                            <div>
                                <input @focusin="activateUser(user, index)" @focusout="checkEnteredValue(user, index)"
                                       @keypress="checkEnteredValue(user, index)" v-model="user.date"
                                       class="dateInputGlobalLine" name="date" type="date">
                            </div>
                        </div>
                        <div class="userContainerActionsGlobalLine d-flex flex-column">
                            <div v-if="!user.active" class="mb-2 inActiveEdit">
                                <v-icon name="pencil-alt"/>
                            </div>
                            <div v-if="!user.active" class="inActiveEdit">
                                <v-icon name="trash"/>
                            </div>
                            <div v-if="user.active" @click="updateUser(user)" class="mb-2 activeEdit">
                                <v-icon name="check"/>
                            </div>
                            <div v-if="user.active" @click="deleteUser(user)" class="activeDelete">
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
            checkEnteredValue(user, index) {
                axios.post('/users/check-value', user)
                    .then((response) => {
                        if (response.data.matches === true) {
                            this.users.map(x => {
                                if (x.id === user.id) {
                                    x.active = false;
                                    this.$set(this.users, index, x);
                                }
                            });
                        } else {
                            this.users.map(x => {
                                if (x.id === user.id) {
                                    x.active = true;
                                    this.$set(this.users, index, x);
                                }
                            });
                        }
                    })
                    .catch((e) => {
                        this.error = e;
                    });
            },
            createUser() {
                axios.post('/users/create')
                    .then((response) => {
                        if (response.data.created === true) {
                            this.created = true;
                            this.updated = false;
                            this.deleted = false;
                            this.getUsers();
                        }
                    })
                    .catch((e) => {
                        this.error = e;
                    });
            },
            updateUser(user) {
                axios.post('/users/update', user)
                    .then((response) => {
                        if (response.data.updated === true) {
                            this.updated = true;
                            this.created = false;
                            this.deleted = false;
                            this.getUsers();
                        }
                    })
                    .catch((e) => {
                        this.error = e;
                    });
            },
            deleteUser(user) {
                axios.post('/users/delete/' + user.id)
                    .then((response) => {
                        if (response.data.deleted === true) {
                            this.deleted = true;
                            this.created = false;
                            this.updated = false;
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

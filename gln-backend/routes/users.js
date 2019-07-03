const express = require('express');

class UsersApi {

    constructor() {
        const router = express.Router({ strict: true });

        router.get("/users", this.getUsers.bind(this));
        router.get("/users/:id", this.getUser.bind(this));
        router.put("/users/:id", this.updateUser.bind(this));
        router.delete("/users/:id", this.deleteUser.bind(this));

        return router;
    }

    getUsers(req, res) {

    }

    getUser(req, res) {

    }

    updateUser(req, res) {

    }

    deleteUser(req, res) {

    }
}

module.exports = UsersApi;
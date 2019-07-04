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
        res.sendStatus(501);
    }

    getUser(req, res) {
        res.sendStatus(501);
    }

    updateUser(req, res) {
        res.sendStatus(501);
    }

    deleteUser(req, res) {
        res.sendStatus(501);
    }
}

module.exports = UsersApi;
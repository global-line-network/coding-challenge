const express = require('express');

const UserStore = require('../store/user-store');

const store = new UserStore();

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
        res.status(200).send(store.getAllUsers());
    }

    getUser(req, res) {
        const id = req.params.id;

        const user = store.getUser(Number.parseInt(id));

        if (user) {
            return res.status(200).send(user);
        }
        
        return res.sendStatus(404);
    }

    updateUser(req, res) {
        res.sendStatus(501);
    }

    deleteUser(req, res) {
        res.sendStatus(501);
    }
}

module.exports = UsersApi;
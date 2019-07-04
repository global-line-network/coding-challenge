const jsonfile = require('jsonfile');
const fs = require('fs');

const initialState = {
    users: [{ id: 1, name: "Jerome"}, { id: 2, name: "Hello World"}]
};

const storePath = './users.json';

class UserStore {

    constructor() {
        const storeExists = fs.existsSync(storePath);

        if (!storeExists) {
            jsonfile.writeFileSync(storePath, initialState);
        }
    }

    createUser(user) {
        const store = jsonfile.readFileSync(storePath);

        user.id = store.users.length + 1;

        const newStore = Object.assign({
            users: [
                ...store.users,
                user
            ]
        }, store);

        jsonfile.writeFileSync(storePath, newStore);
    }

    getAllUsers() {
        const store = jsonfile.readFileSync(storePath);

        return store.users;
    }

    getUser(id) {
        const store = jsonfile.readFileSync(storePath);

        return store.users.find(user => user.id === id);
    }

    updateUser(id, user) {
        const store = jsonfile.readFileSync(storePath);

        const newStore = Object.assign({
            users: [
                ...store.users.filter(user => user.id !== id),
                user
            ]
        }, store);

        jsonfile.writeFileSync(storePath, newStore);
    }

    deleteUser(id) {
        const store = jsonfile.readFileSync(storePath);

        const newStore = Object.assign({
            users: [
                ...store.users.filter(user => user.id !== id)
            ]
        }, store);

        jsonfile.writeFileSync(storePath, newStore);
    }

}

module.exports = UserStore;
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

    getAllUsers() {
        const store = jsonfile.readFileSync(storePath);

        return store.users;
    }

    getUser(id) {
        const store = jsonfile.readFileSync(storePath);

        return store.users.find(user => user.id === id);
    }

    updateUser(id, user) {

    }

    deleteUser(id) {

    }

}

module.exports = UserStore;
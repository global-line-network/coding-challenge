import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoading: false,
    error: null,
    users: [],
  },
  mutations: {
    fetchUsers(state, payload) {
      state.users = payload.results;
    },
    createUser(state, payload) {
      const newUser = payload.user;
      state.users.unshift(newUser);
    },
    editUser(state, payload) {
      const userToBeEdit = payload.user;
      state.users = state.users.map(user => {
        if (Number(user.id) === Number(userToBeEdit.id)) {
          user.email = userToBeEdit.email;
          user.first_name = userToBeEdit.first_name;
        }
        return user;
      });
    },
    deleteUser(state, payload) { //payload receiving contains user id (id)
      state.users = state.users.filter(user => {
        console.log("HIT + " + payload.id + user.id);
        return (Number(user.id) !== Number(payload.id));
      });
    },
    rearrageUsers(state, _) { //rearrange the user.id to arrange it nicely in UI
      var num = 1;
      state.users = state.users.map(user => {
        user.id = num++;
        console.log(user.id);
        return user;
      });
    },
    resetError(state, _) {
      console.log("HITTT")
      state.error = null;
    }
  },

  actions: {
    fetchUsers(context, _) {
      context.state.error = null;
      context.state.isLoading = true;
      context.state.error = null;
      fetch('https://reqres.in/api/users')
        .then((response) => {
          console.log("GET = " + response);
          if (response.ok) {
            return response.json();
          }
        })
        .then((input) => {
          const users = input.data
          const results = [];
          for (const id in users) {
            results.push({
              id: users[id].id,
              email: users[id].email,
              first_name: users[id].first_name,
              avatar: users[id].avatar
            });
          }
          context.state.isLoading = false;
          context.commit('fetchUsers', { results: results });

          return results;
        })
        .catch((error) => {
          console.log(error);
          context.state.isLoading = false;
          context.state.error = 'Failed to fetch data - please try again later.';
        });
    },
    createOrUpdateUser(context, payload) {
      const users = context.getters.getUsers;
      try {
        if (!payload.first_name || !payload.email) {
          context.state.error = "First Name and Email fields cannot be empty !";
          return
        }
        if (payload.id) { //id exists = edit
          context.commit('editUser', { user: payload });
        }
        else { // id not exists = create new
          const newId = users[users.length - 1].id + 1
          const user = {
            id: newId,
            email: payload.email,
            first_name: payload.first_name,
          };
          context.commit('createUser', { user: user });
          context.commit('rearrageUsers');
        }
      }
      catch (e) {
        const errorMsg = "Error occured when creating/updating user with error = " + e;
        context.state.error = errorMsg;
      }
    },
    deleteUser(context, payload) { //payload receiving is user id
      try {
        context.commit('deleteUser', { id: payload });
        context.commit('rearrageUsers');
      }
      catch (e) {
        const errorMsg = "Error occured when deleting user with error = " + e;
        context.state.error = errorMsg;
      }
    },
    resetError(context, _) {
      context.commit('resetError');
    }
  },
  getters: {
    getUsers(state) {
      return state.users
    },
    isLoading(state) {
      return state.isLoading;
    },
    getErrorMessage(state) {
      return state.error;
    }
  }
})

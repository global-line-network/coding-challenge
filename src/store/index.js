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
      context.state.error = null;
      let url = 'https://reqres.in/api/users';
      let method = "POST";
      if (payload.id) {
        url = 'https://reqres.in/api/users/' + payload.id;
        method = "PUT";
      }
      fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: payload.email,
          first_name: payload.first_name,
        }),
      })
        .then((response) => {
          console.log("POST/PUT = " + response);
          if (!response.ok) {
            throw new Error('Could not save data!');
          }
        })
        .catch((error) => {
          console.log(error);
          this.error = error.message;
        })
        .finally(() => {
          context.dispatch('fetchUsers');
        }

        );
    },
    deleteUser(context, payload) {
      context.state.error = null;
      const url = 'https://reqres.in/api/users/' + payload
      fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          console.log("DELETE = " + response);
          if (!response.ok) {
            throw new Error('Could not delete data!');
          }
        })
        .catch((error) => {
          console.log(error);
          this.error = error.message;
        })
        .finally(() => {
          context.dispatch('fetchUsers');
        }
        );
    }
  },
  getters: {
    getUsers(state) {
      return state.users
    },
    isLoading(state) {
      return state.isLoading;
    }
  }
})

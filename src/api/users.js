import Constants from "../constants";
import axios from "axios";

export function fetchUsers() {
  let url = `${Constants.users.fetch}/users?page=2`;
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((res) => {
        let data = res.data;
        resolve(data).then((res) => res.json());
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function createUser(formData) {
  let url = `${Constants.users.fetch}/users`;
  let { first_name, last_name } = formData;
  return new Promise((resolve, reject) => {
    axios
      .post(url, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        user: {
          first_name,
          last_name,
        },
      })
      .then((res) => {
        let data = res.data;
        resolve(data).then((res) => res.json());
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function deleteUser() {}

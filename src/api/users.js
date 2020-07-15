import Constants from "../constants";
import axios from "axios";

const axiosGetPromise = (url) => {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((res) => {
        resolve(res).then((res) => res.json());
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export function getAvatar(gender) {
  !gender ? gender = "male" : gender = gender.toLowerCase()
  
  let url = Constants.users.img;
  return axiosGetPromise(url + `?gender=${gender}`);
}

export function fetchUsers() {
  let url = `${Constants.users.fetch}/users?page=2`;
  return axiosGetPromise(url);
}

export function createUser(userData) {
  let url = `${Constants.users.fetch}/users`;
  return new Promise((resolve, reject) => {
    axios
      .post(url, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        userData: userData,
      })
      .then((res) => {
        let data = res;
        resolve(data).then((res) => res.json());
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function deleteUser(userID) {
  return userID;
  // let url = `${Constants.users.fetch}/users/${userID}`;
  // axiosPromise(url);
}

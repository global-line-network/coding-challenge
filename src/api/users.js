import Constants from "../constants";
import axios from "axios";

export function fetchUsers() {
  let url = Constants.users.fetch;
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

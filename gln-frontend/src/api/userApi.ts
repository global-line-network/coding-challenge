import { UserAccount } from "./types";
import { async } from "q";

const ENDPOINT = "https://reqres.in";

class UserApi {
    constructor() {
        
    }

    static getUsers() : Promise<UserAccount[]> {

        return fetch(`${ENDPOINT}/api/users`)
            .then(res => {
                return res.json();
            })
            .then(json => json.data.map((item : any) => {
                const user : UserAccount = {
                    id: item.id,
                    name: `${item.first_name} ${item.last_name}`,
                    avatarUrl: item.avatar,
                    birthDate: "test"
                };

                return user;
            }));
    }
}

export default UserApi;
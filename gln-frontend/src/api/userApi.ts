import { UserAccount } from "./types";

const ENDPOINT = "https://reqres.in";

class UserApi {

    static getUsers() : Promise<UserAccount[]> {

        return fetch(`${ENDPOINT}/api/users?per_page=8`)
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
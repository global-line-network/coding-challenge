import { UserAccount } from "./types";

const ENDPOINT = "https://reqres.in";

class UserApi {

    static async createUser(user: UserAccount) : Promise<Response> {

        const names = user.name.split(' ');

        return await fetch(`${ENDPOINT}/api/users`, {
            method: 'POST',
            body: JSON.stringify({
                first_name: names[0],
                last_name: names.length > 1 ? names[1] : '',
                avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/calebogden/128.jpg"
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    static async getUsers() : Promise<UserAccount[]> {

        const response = await fetch(`${ENDPOINT}/api/users?per_page=8`);

        const responseJson = await response.json();

        return responseJson.data.map((item : any) => {
            const user : UserAccount = {
                id: item.id,
                name: `${item.first_name} ${item.last_name}`,
                avatarUrl: item.avatar,
                birthDate: "test"
            };

            return user;
        });
    }
}

export default UserApi;
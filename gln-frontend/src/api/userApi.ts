import { UserAccount } from "./types";

const ENDPOINT = "https://reqres.in";

const mapApiModelToViewModel = (apiUser: any) : UserAccount => {
    const user : UserAccount = {
        id: apiUser.id,
        name: `${apiUser.first_name} ${apiUser.last_name}`,
        avatarUrl: apiUser.avatar,
        birthDate: new Date().toLocaleDateString()
    };

    return user;
};

class UserApi {

    static async createUser(user: UserAccount) : Promise<UserAccount> {

        const names = user.name.split(' ');

        const response = await fetch(`${ENDPOINT}/api/users`, {
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

        const responseJson = await response.json();

        return mapApiModelToViewModel(responseJson);
    }

    static async getUsers() : Promise<UserAccount[]> {

        const response = await fetch(`${ENDPOINT}/api/users?per_page=8`);

        const responseJson = await response.json();

        return responseJson.data.map((item : any) => mapApiModelToViewModel(item));
    }
}

export default UserApi;
import UserApi from "./userApi";
import { UserAccount } from "./types";

test("Can get users from api", async () => {

    const users : UserAccount[] = await UserApi.getUsers();

    expect(users).toBeDefined();
    expect(users.length).toBeGreaterThan(1);
});
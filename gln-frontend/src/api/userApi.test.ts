import UserApi from "./userApi";
import { UserAccount } from "./types";

test("Can get users from api", async () => {

    const users : UserAccount[] = await UserApi.getUsers();

    expect(users).toBeDefined();
    expect(users.length).toBeGreaterThan(1);
});

test("Can create user on api", async () => {

    const newUser = await UserApi.createUser({
        id: -1,
        name: "Hello",
        birthDate: "test",
        avatarUrl: ""
    });

    expect(newUser).toBeDefined();
    expect(newUser.id).toBeDefined();
    expect(newUser.name).toBe("Hello ");
    expect(newUser.avatarUrl).toBeDefined();
});

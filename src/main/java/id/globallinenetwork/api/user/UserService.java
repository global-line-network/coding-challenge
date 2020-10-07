package id.globallinenetwork.api.user;

import id.globallinenetwork.api.utility.PasswordGenerator;
import org.springframework.stereotype.Service;

import java.security.NoSuchAlgorithmException;
import java.security.NoSuchProviderException;
import java.security.SecureRandom;
import java.time.Instant;
import java.util.*;

@Service
public class UserService implements IUser {

    private static final String EMAIL_DOMAIN = "@globallinenetwork.com";
    private final List<User> users = new ArrayList<>();
    private SecureRandom secureRandom = null;

    public UserService() {
        int id = 0;

        try {
            secureRandom = SecureRandom.getInstance("SHA1PRNG", "SUN");
            id = secureRandom.nextInt(1000);
        } catch (NoSuchAlgorithmException | NoSuchProviderException e) {
            e.printStackTrace();
        }
        User user1 = new User(1, "Muhammad", "CEO", "muhammad@globallinenetwork.com", "fur7jf89", Instant.now().toString(), Instant.now().toString());
        User user2 = new User(2, "Abu Bakar", "CTO", "abu.bakar@globallinenetwork.com", "fur7jf89", Instant.now().toString(), Instant.now().toString());
        User user3 = new User(3, "Umar", "Software Engineer", "umar@globallinenetwork.com", "fur7jf89", Instant.now().toString(), Instant.now().toString());
        User user4 = new User(4, "Usman", "FrontEnd Engineer", "usman@globallinenetwork.com", "fur7jf89", Instant.now().toString(), Instant.now().toString());
        User user5 = new User(5, "Ali", "Security Engineer", "ali@globallinenetwork.com", "fur7jf89", Instant.now().toString(), Instant.now().toString());
        User user6 = new User(6, "Eve Holt", "Security Engineer", "eve.holt@reqres.in", "pistol", Instant.now().toString(), Instant.now().toString());
    }

    public List<User> getUsers() {
        return users;
    }

    @Override
    public Map<String, Object> registration(RegisterDto registerDto) {
        Map<String, Object> data = new HashMap<>();
        if (registerDto.getPassword().equals("") || registerDto.getPassword() == null) {
            data.put("error", "Missing password");
            return data;
        }

        data.put("id", 4);
        data.put("token", "QpwL5tke4Pnpja7X4");

        return data;
    }

    @Override
    public Map<String, Object> login(LoginDto loginDto) {
        Map<String, Object> data = new HashMap<>();
        if (loginDto.getPassword().equals("") || loginDto.getPassword() == null) {
            data.put("error", "Missing password");
            return data;
        } else {
            Optional<User> optionalUser = users.stream().filter(user -> user.getEmail().equals(loginDto.getEmail()) &&
                    user.getPassword().equals(loginDto.getPassword())).findFirst();
            if (optionalUser.isPresent()) {
                data.put("token", "QpwL5tke4Pnpja7X4");
                return data;
            }
        }
        return null;
    }

    @Override
    public User createUser(CreateUserDto createUserDto) throws NoSuchProviderException, NoSuchAlgorithmException {
        int id = secureRandom.nextInt(1000);
        String email = createUserDto.getName() + EMAIL_DOMAIN;
        User createUser = new User(id, createUserDto.getName(), createUserDto.getJob(), email,
                PasswordGenerator.generateRandomPassword(), Instant.now().toString(), Instant.now().toString());
        users.add(createUser);

        return users.get(users.size() - 1);
    }

    @Override
    public User updateUser(Integer id, CreateUserDto createUserDto) {

        if (id != null) {
            Optional<User> optionalUser = users.stream().filter(user -> user.getId().equals(id)).findFirst();
            if (optionalUser.isPresent()) {
                User currentUser = optionalUser.get();
                currentUser.setUpdateAt(Instant.now().toString());
                return currentUser;
            }
        }
        return null;
    }

    @Override
    public boolean deleteUser(Integer id) {
        return users.removeIf(user -> user.getId().equals(id));
    }
}

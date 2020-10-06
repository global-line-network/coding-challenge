package id.globallinenetwork.api.user;

import org.springframework.stereotype.Service;

import java.security.NoSuchAlgorithmException;
import java.security.NoSuchProviderException;
import java.security.SecureRandom;
import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

@Service
public class UserService implements IUser {
    @Override
    public Map<String, Object> registration(RegisterDto registerDto) {
        Map<String, Object> data = new HashMap<>();
        if (registerDto.getPassword().equals("") || registerDto.getPassword() == null){
            data.put("error", "Missing password");
            return data;
        }

        data.put("id", 4);
        data.put("token", "QpwL5tke4Pnpja7X4");

        return data;
    }

    @Override
    public Map<String, Object> login(LoginDto loginDto){
        Map<String, Object> data = new HashMap<>();
        if (loginDto.getPassword().equals("") || loginDto.getPassword() == null){
            data.put("error", "Missing password");
            return data;
        }

        data.put("token", "QpwL5tke4Pnpja7X4");
        return data;
    }

    @Override
    public ResponseCreateUser createUser(CreateUserDto createUserDto) throws NoSuchProviderException, NoSuchAlgorithmException {
        ResponseCreateUser createUser = new ResponseCreateUser();
        createUser.setName(createUserDto.getName());
        createUser.setJob(createUserDto.getJob());

        SecureRandom secureRandom = SecureRandom.getInstance("SHA1PRNG", "SUN");
        int id = secureRandom.nextInt(1000);
        createUser.setId(String.valueOf(id));
        createUser.setCreatedAt(Instant.now().toString());

        return createUser;
    }

    @Override
    public ResponseUpdateUser updateUser(Integer id, CreateUserDto createUserDto){
        if (id != null){
            ResponseUpdateUser updateUser = new ResponseUpdateUser();
            updateUser.setName(createUserDto.getName());
            updateUser.setJob(createUserDto.getJob());
            updateUser.setUpdatedAt(Instant.now().toString());
            return updateUser;
        }
        return null;
    }
}

package id.globallinenetwork.api.user;

import org.springframework.stereotype.Service;

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
}

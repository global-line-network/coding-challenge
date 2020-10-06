package id.globallinenetwork.api.user;

import java.util.Map;

public interface IUser {
    Map<String, Object> registration(RegisterDto registerDto);
}

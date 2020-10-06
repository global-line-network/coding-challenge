package id.globallinenetwork.api.user;

import java.security.NoSuchAlgorithmException;
import java.security.NoSuchProviderException;
import java.util.Map;

public interface IUser {
    Map<String, Object> registration(RegisterDto registerDto);
    Map<String, Object> login(LoginDto loginDto);
    ResponseCreateUser createUser(CreateUserDto createUserDto) throws NoSuchProviderException, NoSuchAlgorithmException;
}

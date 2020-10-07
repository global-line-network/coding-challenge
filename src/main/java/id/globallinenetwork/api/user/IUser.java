package id.globallinenetwork.api.user;

import java.security.NoSuchAlgorithmException;
import java.security.NoSuchProviderException;
import java.util.Map;

public interface IUser {
    Map<String, Object> registration(RegisterDto registerDto);
    Map<String, Object> login(LoginDto loginDto);
    User createUser(CreateUserDto createUserDto) throws NoSuchProviderException, NoSuchAlgorithmException;
    User updateUser(Integer id, CreateUserDto createUserDto);
    boolean deleteUser(Integer id);
}

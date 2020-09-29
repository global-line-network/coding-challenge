package com.gln.service;

import com.gln.model.User;
import com.gln.repository.UserRepository;

import javax.inject.Inject;
import javax.inject.Singleton;
import java.util.Optional;

@Singleton
public class UserService {

    @Inject
    UserRepository userRepository;

    public Optional<User> findByEmail(String email) {
        return Optional.ofNullable(userRepository.findByEmail(email));
    }

    public void addUser(User user){
        userRepository.persistAndFlush(user);
    }

    public boolean isUserPersistent(User user) {
        return userRepository.isPersistent(user);
    }

}

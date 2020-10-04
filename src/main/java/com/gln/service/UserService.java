package com.gln.service;

import com.gln.model.User;
import com.gln.repository.UserRepository;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.util.Optional;

@ApplicationScoped
public class UserService {

    @Inject
    UserRepository userRepository;

    public Optional<User> findByEmail(String email) {
        return Optional.ofNullable(userRepository.findByEmail(email));
    }

    public void addUser(User user){
        userRepository.persist(user);
    }

    public boolean isUserPersistent(User user) {
        return userRepository.isPersistent(user);
    }

}

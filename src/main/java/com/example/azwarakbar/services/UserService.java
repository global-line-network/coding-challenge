package com.example.azwarakbar.services;

import com.example.azwarakbar.models.User;
import io.ebean.EbeanServer;
import io.ebean.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    EbeanServer server;

    @Transactional
    public User save(User user) {
        server.save(user);

        return user;
    }
}

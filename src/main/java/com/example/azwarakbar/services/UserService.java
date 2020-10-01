package com.example.azwarakbar.services;

import com.example.azwarakbar.models.User;
import com.example.azwarakbar.request.LoginUser;
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

    public boolean check(LoginUser user) {
        User usr = server.find(User.class)
                .where()
                .eq("email", user.getEmail())
                .eq("password", user.getPassword()).findOne();

        if (usr != null) {
            return true;
        }

        return false;
    }
}

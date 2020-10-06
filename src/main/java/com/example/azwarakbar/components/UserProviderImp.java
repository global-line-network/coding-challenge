package com.example.azwarakbar.components;

import io.ebean.config.CurrentUserProvider;
import org.springframework.stereotype.Component;

@Component
public class UserProviderImp implements CurrentUserProvider {

    @Override
    public Object currentUser() {
        return "test";
    }
}

package com.example.azwarakbar.services;

import com.example.azwarakbar.models.User;
import com.example.azwarakbar.models.UserJob;
import com.example.azwarakbar.request.LoginUser;
import com.example.azwarakbar.response.UserFormat;
import com.example.azwarakbar.utils.ZJson;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import io.ebean.EbeanServer;
import io.ebean.PagedList;
import io.ebean.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserJobService {

    @Autowired
    EbeanServer server;

    @Transactional
    public UserJob save(UserJob userJob) {
        server.save(userJob);

        return userJob;
    }

    public UserJob update(UserJob userJob) {
        UserJob userJob1 = server.find(UserJob.class)
                .where()
                .eq("id", userJob.getId())
                .findOne();

        if (userJob1 != null) {
            userJob1.setName(userJob.getName());
            userJob1.setJob(userJob.getJob());
            userJob1.update();

            return userJob1;
        }

        return null;
    }

    public UserJob getUserJob(Long id) {
        return server.find(UserJob.class)
                .where()
                .eq("id", id)
                .findOne();
    }
}

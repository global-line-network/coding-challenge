package com.example.azwarakbar.services;

import com.example.azwarakbar.models.User;
import com.example.azwarakbar.request.LoginUser;
import com.example.azwarakbar.response.ListUserFormat;
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
public class UserService {

    private static final int PAGING_SIZE = 6;

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

    public ObjectNode getListUser(int page) {
        int indexPage = page > 0 ? page - 1 : page;
        PagedList<User> pageUser = server.find(User.class)
                .setFirstRow(PAGING_SIZE * indexPage)
                .setMaxRows(PAGING_SIZE)
                .findPagedList();

        ObjectMapper mapper = new ObjectMapper();
        ObjectNode objNode = mapper.createObjectNode();
        ArrayNode arrayNodeUser = ZJson.toArrayNode(getFormattedList(pageUser.getList()));

        objNode.put("page", page);
        objNode.put("per_page", PAGING_SIZE);
        objNode.put("total", pageUser.getTotalCount());
        objNode.put("total_pages", pageUser.getTotalPageCount());
        objNode.set("data", arrayNodeUser);

        return objNode;
    }

    private List<ListUserFormat> getFormattedList(List<User> userList) {
        List<ListUserFormat> listUserFormats = new ArrayList<>();

        for (User user : userList) {
            ListUserFormat luf = new ListUserFormat(user.getId(), user.getEmail(), user.getFirstName(),
                    user.getLastName(), user.getAvatar());

            listUserFormats.add(luf);
        }

        return listUserFormats;
    }
}

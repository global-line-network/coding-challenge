package com.gln;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gln.entity.User;
import com.gln.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@SpringBootTest(classes = GLNApplication.class)
@AutoConfigureMockMvc
public class UserTest {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private UserService userService;
    @Autowired
    private ObjectMapper mapper;

    private User user;
    private String userJson;

    @BeforeEach
    public void loadUser() throws Exception {
        user = new User("first", "last", "abc@emil.com", "www.avatar.com");
        userJson = mapper.writeValueAsString(user);
    }


    @Test
    public void createUserTest() throws Exception {

        this.mockMvc.perform(post("/user/create")
                .contentType(MediaType.APPLICATION_JSON)
                .content(userJson)
        ).andExpect(status().isOk());
    }

    @Test
    public void updateUserTest() throws Exception {

        this.mockMvc.perform(post("/user/create")
                .contentType(MediaType.APPLICATION_JSON)
                .content(userJson)
        ).andExpect(status().isOk());

        MvcResult result = this.mockMvc.perform(get("/user/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(userJson)).andReturn();

        User updateUser = mapper.readValue(result.getResponse().getContentAsString(), User.class);
        updateUser.setFirstName("ufirstName");
        updateUser.setLastName("ulastName");


        this.mockMvc.perform(put("/user/update")
                .contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsString(updateUser))
        ).andExpect(status().isOk()).andExpect(content().json(mapper.writeValueAsString(updateUser)));
    }

    @Test
    public void deleteUserTest() throws Exception {

        this.mockMvc.perform(post("/user/create")
                .contentType(MediaType.APPLICATION_JSON)
                .content(userJson)
        ).andExpect(status().isOk());

        MvcResult result = this.mockMvc.perform(get("/user/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(userJson)).andReturn();

        User deleteUser = mapper.readValue(result.getResponse().getContentAsString(), User.class);


        this.mockMvc.perform(delete("/user/delete")
                .contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsString(deleteUser))
        ).andExpect(status().isAccepted());
    }
}

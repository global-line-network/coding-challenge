package com.gln;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gln.entity.User;
import com.gln.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
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

    @Test
    public void createUserTest() throws Exception {

        User user = new User("John", "Cena", "abc@emil.com", "www.avatar.com");
        String json = mapper.writeValueAsString(user);

        this.mockMvc.perform(post("/user/create")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json)
        ).andExpect(status().isOk());
    }
}

package com.example.azwarakbar;

import com.example.azwarakbar.controller.UserController;
import com.example.azwarakbar.models.User;
import com.example.azwarakbar.services.UserService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.CoreMatchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@WebMvcTest(UserController.class)
public class TestUserController {

    @Autowired
    private MockMvc mvc;

    @MockBean
    private UserService service;

    @Test
    public void givenUsers_whenGetUsers_thenReturnJsonArray() throws Exception {
        User user = new User();
        user.setEmail("saya@example.com");
        user.setPassword("rahasia");

        service.save(user);

        mvc.perform(get("/api/user", 1)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data", hasSize(1)))
                .andExpect(jsonPath("$.data[0].email", is(user.getEmail())));
    }
}

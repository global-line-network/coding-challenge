package id.globallinenetwork.api.controller;

import com.google.gson.Gson;
import id.globallinenetwork.api.user.RegisterDto;
import id.globallinenetwork.api.user.UserController;
import id.globallinenetwork.api.user.UserService;
import org.junit.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import org.springframework.test.web.servlet.setup.MockMvcBuilders;


import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

import static org.assertj.core.api.Assertions.assertThat;


@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Tag("UserController")
public class UserControllerTest {

    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @Autowired
    private TestRestTemplate restTemplate;

    @BeforeEach
    public void test(){
        mockMvc = MockMvcBuilders.standaloneSetup(new UserController(userService)).build();
    }

    @Test
    @DisplayName("Registration of new user it will return error if failed")
    public void register() throws Exception {
        RegisterDto registerDto = new RegisterDto();
        registerDto.setEmail("eve.holt@reqres.in");
        registerDto.setPassword("cityslicka");

        Gson gson = new Gson();
        String gsonRegister = gson.toJson(registerDto);

        //when
        ResponseEntity<?> result = restTemplate.postForEntity("/api/register", registerDto, ResponseEntity.class);

        //Then
        assertThat(result.getStatusCode()).isEqualTo(HttpStatus.OK);

        Map<String, Object> data = new HashMap<>();
        data.put("id", 4);
        data.put("token", "QpwL5tke4Pnpja7X4");
        assertThat(Objects.equals(result.getBody(), data));
    }
}

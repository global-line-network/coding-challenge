package id.globallinenetwork.api.user;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.NoSuchAlgorithmException;
import java.security.NoSuchProviderException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterDto registerDto){
        Map<String, Object> data = userService.registration(registerDto);
        if (data.containsKey("id")){
            return ResponseEntity.ok().body(data);
        }

        return ResponseEntity.badRequest().body(data);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDto loginDto){
        Map<String, Object> data = userService.login(loginDto);
        if (data.containsKey("token")){
            return ResponseEntity.ok().body(data);
        }

        return ResponseEntity.badRequest().body(data);
    }

    @PostMapping("/users")
    public ResponseEntity<?> createUser(@RequestBody CreateUserDto createUserDto){
        Map<String, Object> data = new HashMap<>();
        if (createUserDto.getName().equals("") || createUserDto.getName() == null){
            data.put("error:", "Missing name");
            return ResponseEntity.badRequest().body(data);
        }

        if (createUserDto.getJob().equals("") || createUserDto.getJob() == null){
            data.put("error:", "Missing Job");
            return ResponseEntity.badRequest().body(data);
        }

        try {
            return ResponseEntity.ok().body(userService.createUser(createUserDto));
        } catch (NoSuchProviderException | NoSuchAlgorithmException e) {
            data.put("error", e);
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(data);
        }
    }

    @RequestMapping(value = "/users/{id}", method = {RequestMethod.PATCH, RequestMethod.PUT})
    public ResponseEntity<?> updateUser(@PathVariable("id") Integer id, @RequestBody CreateUserDto createUserDto){
        User result = userService.updateUser(id, createUserDto);
        Map<String, Object> data = new HashMap<>();
        if (result == null) {
            data.put("error:","Missing id");
            return ResponseEntity.badRequest().body(data);
        }
        return ResponseEntity.ok().body(result);
    }

    @DeleteMapping(value = "/users/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable("id") Integer id){
        if (userService.deleteUser(id)) {
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

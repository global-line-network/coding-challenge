package id.globallinenetwork.api.user;

import id.globallinenetwork.api.utility.GetSingleData;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

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
        if (data == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }else if (data.containsKey("token")){
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
        } catch (NoSuchAlgorithmException e) {
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

    @GetMapping(value = "/users/{id}")
    public ResponseEntity<?> singleUser(@PathVariable("id") Integer id){
        Map<String,Object> data = userService.getSingleUser(id);
        return GetSingleData.getResponseEntity(data);
    }

    @GetMapping(value = "/users")
    public ResponseEntity<?> getAllUser(@RequestParam("page") Optional<Integer> page,
                                        @RequestParam("delay") Optional<Integer> delay) throws InterruptedException, ExecutionException {
        if (delay.isPresent()){
            return new ResponseEntity<>(userService.getAsyncAllUser(delay.get(), 1).get(),
                    HttpStatus.OK);
        }else {
            ListAllUserDto listUser = null;
            if (page.isPresent()){
                final int perPage = 6;
                int start = (perPage - 1) * page.get();
                int totalData = userService.getUsers().size();

                if (start > totalData) {
                    return new ResponseEntity<>(null, HttpStatus.FORBIDDEN);
                } else if (totalData <= 0) {
                    return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
                }
                listUser = userService.getListUser(page.get());
            }

            return new ResponseEntity<>(listUser, HttpStatus.OK);
        }
    }
}

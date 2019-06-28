package crud;

import java.util.List;

import net.bytebuddy.implementation.bytecode.Throw;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:8080", maxAge = 3600)
@RestController
public class CrudController {
    private final UsersRepository userRepository;

    CrudController(UsersRepository userRepository) {

        this.userRepository = userRepository;
    }

    @CrossOrigin
    @GetMapping("/api/users")
    List<Users> all() { return userRepository.findAll(); }

    @CrossOrigin
    @RequestMapping(value = "/api/users", method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE)
    Users createUser(@RequestBody Users theNewUser) {
        String token = CrudUtils.generateToken();
        theNewUser.setToken(token);
        return userRepository.save(theNewUser);
    }

    @CrossOrigin
    @PutMapping("/api/users/{id}")
    Users updateUser(@RequestBody Users newUser, @PathVariable Long id) {

        return userRepository.findById(id)
                .map(users -> {
                    users.setJob(newUser.getJob());
                    users.setPassword(newUser.getPassword());
                    users.setFirst_name(newUser.getFirst_name());
                    users.setLast_name(newUser.getLast_name());
                    users.setEmail(newUser.getEmail());
                    users.setAvatar(newUser.getAvatar());
                    return userRepository.save(users);
                })
                .orElseGet(() -> {
                    newUser.setId(id);
                    return userRepository.save(newUser);
                });
    }

    @CrossOrigin
    @GetMapping("/api/users/{id}")
    Users getUser(@PathVariable Long id) {

        return userRepository.findById(id)
                .orElseThrow(() -> new UsersNotFoundException(id));
    }

    @CrossOrigin
    @DeleteMapping("/api/users/{id}")
    void deleteUser(@PathVariable Long id) { userRepository.deleteById(id); }

}

package com.gln.controller;

import com.gln.entity.User;
import com.gln.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;


@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping("/create")
    public User saveUser(@RequestBody User user) {
        return userService.save(user);
    }

    @PutMapping("/update")
    public User update(@RequestBody User user) {
        return userService.save(user);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<User> delete(@RequestBody User user) {
        userService.delete(user);
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        Optional<User> user = userService.get(id);
        if (user.equals(Optional.empty()))
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        else
            return new ResponseEntity<>(user.get(), HttpStatus.NOT_FOUND);
    }

    @GetMapping("list")
    public Page<User> getUserList(@RequestParam Integer pageNo) {
        return userService.getList(pageNo);
    }
}
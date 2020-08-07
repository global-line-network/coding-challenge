package com.gln.service;

import com.gln.entity.User;
import com.gln.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    UserRepository repository;

    public User save(User user) {
        return repository.save(user);

    }

    public void delete(User user) {
        repository.delete(user);

    }

    public Optional<User> get(Long id) {
        return repository.findById(id);

    }

    public Page<User> getList(int pageNo) {
        Pageable pageable = PageRequest.of(pageNo, 6);
        return repository.findAll(pageable);

    }
}

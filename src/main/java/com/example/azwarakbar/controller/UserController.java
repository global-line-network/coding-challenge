package com.example.azwarakbar.controller;

import com.example.azwarakbar.models.User;
import com.example.azwarakbar.response.RegistrationSuccess;
import com.example.azwarakbar.services.UserService;
import com.example.azwarakbar.utils.ResponseUtils;
import com.example.azwarakbar.utils.ZJson;
import com.example.azwarakbar.utils.ZString;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.validation.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Controller
public class UserController {

    @Autowired
    private UserService service;

    @PostMapping(value = "/api/register", consumes = "application/json")
    @ResponseBody
    public ResponseEntity<ObjectNode> register(@RequestBody User user) {

        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator = factory.getValidator();

        Set<ConstraintViolation<User>> constraintViolations = validator.validate(user);
        List<String> listError = new ArrayList<>();

        if (constraintViolations.size() > 0 ) {

            for (ConstraintViolation<User> contraints : constraintViolations) {
                String strError = contraints.getPropertyPath() + ": " + contraints.getMessage();
                listError.add(strError);
            }

            ArrayNode arrayNode = ZJson.toArrayNode(listError);

            return new ResponseEntity<>(ResponseUtils.getError(arrayNode), HttpStatus.BAD_REQUEST);
        }

        service.save(user);
        String token = ZString.generateRandomStr();
        RegistrationSuccess rs = new RegistrationSuccess(user.getId(), token);
        ObjectNode objectNode = ZJson.toObjectNode(rs);

        return ResponseEntity.ok(objectNode);
    }
}

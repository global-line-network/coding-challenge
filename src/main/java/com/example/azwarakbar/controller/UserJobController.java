package com.example.azwarakbar.controller;

import com.example.azwarakbar.models.User;
import com.example.azwarakbar.models.UserJob;
import com.example.azwarakbar.request.LoginUser;
import com.example.azwarakbar.response.RegistrationSuccess;
import com.example.azwarakbar.response.UserFormat;
import com.example.azwarakbar.services.UserJobService;
import com.example.azwarakbar.services.UserService;
import com.example.azwarakbar.utils.ResponseUtils;
import com.example.azwarakbar.utils.ZJson;
import com.example.azwarakbar.utils.ZString;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Controller
public class UserJobController {

    @Autowired
    private UserJobService service;

    @PostMapping(value = "/api/users", consumes = "application/json")
    @ResponseBody
    public ResponseEntity<ObjectNode> create(@RequestBody UserJob userJob) {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator = factory.getValidator();
        Set<ConstraintViolation<UserJob>> constraintViolations = validator.validate(userJob);
        List<String> listError = new ArrayList<>();

        if (constraintViolations.size() > 0 ) {
            for (ConstraintViolation<UserJob> contraints : constraintViolations) {
                String strError = contraints.getPropertyPath() + ": " + contraints.getMessage();
                listError.add(strError);
            }

            ArrayNode arrayNode = ZJson.toArrayNode(listError);

            return new ResponseEntity<>(ResponseUtils.getError(arrayNode), HttpStatus.BAD_REQUEST);
        }

        service.save(userJob);
        ObjectMapper mapper = new ObjectMapper();
        ObjectNode objNode = mapper.createObjectNode();

        objNode.put("name", userJob.getName());
        objNode.put("job", userJob.getJob());
        objNode.put("id", userJob.getId());
        objNode.put("createdAt", userJob.getWhenCreated().toString());

        return ResponseEntity.ok(objNode);
    }


}

package com.example.azwarakbar.controller;

import com.example.azwarakbar.models.ProductResource;
import com.example.azwarakbar.models.UserJob;
import com.example.azwarakbar.response.ProductResourceFormat;
import com.example.azwarakbar.response.UserFormat;
import com.example.azwarakbar.services.ProductResourceService;
import com.example.azwarakbar.services.UserJobService;
import com.example.azwarakbar.utils.ResponseUtils;
import com.example.azwarakbar.utils.ZJson;
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
public class ProductResourceController {

    @Autowired
    private ProductResourceService service;

    @RequestMapping(value = "/api/unknown", produces = "application/json")
    @ResponseBody
    public ResponseEntity<ObjectNode> list() {
        return ResponseEntity.ok(service.getList(1));
    }

    @RequestMapping(value = "/api/unknown/{id}", produces = "application/json")
    @ResponseBody
    public ResponseEntity<ObjectNode> getSingle(@PathVariable Long id) {
        ObjectMapper mapper = new ObjectMapper();
        ObjectNode objNode = mapper.createObjectNode();
        ProductResourceFormat pr = service.getSingle(id);

        if (pr != null) {
            ObjectNode userNode = ZJson.toObjectNode(pr);
            objNode.set("data", userNode);
            return ResponseEntity.ok(objNode);
        }

        return new ResponseEntity<>(objNode, HttpStatus.NOT_FOUND);
    }
}

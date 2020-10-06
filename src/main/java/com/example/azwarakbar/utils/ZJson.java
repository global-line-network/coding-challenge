package com.example.azwarakbar.utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

import java.io.IOException;
import java.util.List;

public class ZJson {
    public static <T> ArrayNode toArrayNode(List<T> list) {
        ObjectMapper mapper = new ObjectMapper();
        ArrayNode arrayNode = mapper.valueToTree(list);

        return arrayNode;
    }

    public static String toJsonString(Object object) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            return objectMapper.writeValueAsString(object);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return null;
        }
    }

    public static ObjectNode toObjectNode(Object object) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            String strJson = objectMapper.writeValueAsString(object);
            return (ObjectNode) objectMapper.readTree(strJson);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return null;
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
}

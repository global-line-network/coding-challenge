package com.example.azwarakbar.utils;


import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.google.gson.Gson;

public class ResponseUtils {

    public static ObjectNode getSuccess(String data) {
        return JsonNodeFactory.instance.objectNode()
                .put("status", "success")
                .put("data", data);
    }

    public static ObjectNode getSuccess(ArrayNode arrayNode) {
        ObjectNode result = JsonNodeFactory.instance.objectNode();

        result.put("status", "success");
        result.set("data", arrayNode);

        return result;
    }

    public static ObjectNode getError(String data) {
        return JsonNodeFactory.instance.objectNode()
                .put("status", "error")
                .put("data", data);
    }

    public static ObjectNode getError(Object data) {
        return JsonNodeFactory.instance.objectNode()
                .put("status", "error")
                .put("data", new Gson().toJson(data));
    }

    public static ObjectNode getError(ArrayNode data) {
        return (ObjectNode) JsonNodeFactory.instance.objectNode()
                .put("status", "error")
                .set("error", data);
    }

    public static ObjectNode getSuccess(JsonNode node) {
        return (ObjectNode) JsonNodeFactory.instance.objectNode()
                .put("status", "success")
                .set("data", node);
    }

    public static ObjectNode getSuccessNode(ObjectNode on) {
        return (ObjectNode) JsonNodeFactory.instance.objectNode()
                .put("status", "success")
                .set("data", on);
    }
}
package id.globallinenetwork.api.utility;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Map;

public class GetSingleData {
    public static ResponseEntity<?> getResponseEntity(Map<String, Object> data) {
        if (data == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        } else if (data.containsKey("error")) {
            return new ResponseEntity<>(data, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(data, HttpStatus.OK);
    }
}

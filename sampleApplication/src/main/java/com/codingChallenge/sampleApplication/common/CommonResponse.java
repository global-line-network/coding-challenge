package com.codingChallenge.sampleApplication.common;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

import java.util.List;

@NoArgsConstructor
@Data
public class CommonResponse<T> {
    private long code;
    private String[] messages;
    private List errItems;
    private T result;

    protected CommonResponse(long code, String message, T data) {
        this.code = code;
        if (messages == null) {
            messages = new String[]{message};
        }
        result = data;
    }

    protected CommonResponse(long code, String[] messages, List errItems) {
        this.code = code;
        this.messages = messages;
        this.errItems = errItems;
    }

    /**
     * @param data
     * @param message
     * @param <T>
     * @return
     */
    public static <T> CommonResponse<T> success(T data, String message) {
        return new CommonResponse<T>(HttpStatus.OK.value(), message, data);
    }

    /**
     * @param message
     * @param <T>
     * @return
     */
    public static <T> CommonResponse<T> success(String message) {
        return new CommonResponse<T>(HttpStatus.OK.value(), message, null);
    }

    public static <T> CommonResponse<T> success(T data) {
        return new CommonResponse<T>(HttpStatus.OK.value(), HttpStatus.OK.getReasonPhrase(), data);
    }

    /**
     * @param errorCode
     * @param <T>
     * @return
     */
    public static <T> CommonResponse<T> failed(HttpStatus errorCode) {
        return new CommonResponse<T>(errorCode.value(), errorCode.getReasonPhrase(), null);
    }

    /**
     * @param errorCode
     * @param message
     * @param <T>
     * @return
     */
    public static <T> CommonResponse<T> failed(HttpStatus errorCode, String message) {
        return new CommonResponse<T>(errorCode.value(), message, null);
    }

    /**
     * @param errorCode
     * @param messages
     * @param errItems
     * @param <T>
     * @return
     */
    public static <T> CommonResponse<T> failed(HttpStatus errorCode, String[] messages, List errItems) {
        return new CommonResponse<T>(errorCode.value(), messages, errItems);
    }

    /**
     * @param messages
     * @param <T>
     * @return
     */
    public static <T> CommonResponse<T> failed(String messages) {
        return new CommonResponse<T>(HttpStatus.INTERNAL_SERVER_ERROR.value(), messages, null);
    }

    /**
     * @param <T>
     * @return
     */
    public static <T> CommonResponse<T> failed() {
        return failed(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    /**
     * @param data
     * @param <T>
     * @return
     */
    public static <T> CommonResponse<T> unauthorized(T data) {
        return new CommonResponse<T>(HttpStatus.UNAUTHORIZED.value(), HttpStatus.UNAUTHORIZED.getReasonPhrase(), data);
    }
}

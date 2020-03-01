package com.codingChallenge.sampleApplication.exception;

import com.codingChallenge.sampleApplication.enums.ErrorStatus;
import lombok.Data;

import java.text.MessageFormat;

@Data
public class ServiceException extends RuntimeException{
    private static final long serialVersionUID = 123456789098L;
    public ServiceException(ErrorStatus errorStatus){
        super(errorStatus.getErrorMessage());
    }

    public ServiceException(ErrorStatus errorStatus, Object... params){
        super(MessageFormat.format(errorStatus.getErrorMessage(), params));
    }
}

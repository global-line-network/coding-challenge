package com.codingChallenge.sampleApplication.enums;

public enum ErrorStatus {
    DATA_NOT_FOUND("Data not found");
    private final String errMsg;

    ErrorStatus(String errMsg) {
        this.errMsg = errMsg;
    }

    public String getErrorMessage() {
        return errMsg;
    }
}

package com.easyjobs.api.dto.response.exception;

public class ResourceNotFoundException extends BaseException {

    private static final String message = "Resource not found in DB";
    private static final String code = "2";

    public ResourceNotFoundException() {
        super(message, code);
    }

    public String getMessage() {
        return message;
    }

    public static String getCode() {
        return code;
    }
}
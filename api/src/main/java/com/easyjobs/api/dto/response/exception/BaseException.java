package com.easyjobs.api.dto.response.exception;

public abstract class BaseException extends Exception {
    public String code;

    public BaseException(String message, String code) {
        super(message);
        this.code = code;
    }
}

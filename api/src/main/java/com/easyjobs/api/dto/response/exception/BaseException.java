package com.easyjobs.api.dto.response.exception;

public abstract class BaseException extends Exception {
    public int code;

    public BaseException(String message, int code) {
        super(message);
        this.code = code;
    }
}

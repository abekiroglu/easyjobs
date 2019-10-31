package com.easyjobs.api.dto.response.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.CONFLICT, reason = "Password does not match the criteria")
public class WeakPasswordException extends BaseException {

    private static final String message = "Weak";
    private static final int code = 1;

    public WeakPasswordException() {
        super(message, code);
    }
}

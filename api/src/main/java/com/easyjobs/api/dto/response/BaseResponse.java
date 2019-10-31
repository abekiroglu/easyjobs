package com.easyjobs.api.dto.response;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;

public class BaseResponse<T> extends ResponseEntity<T> {

    private Boolean hasException = false;

    public BaseResponse(HttpStatus status) {
        super(status);
    }

    public BaseResponse(T body, HttpStatus status) {
        super(body, status);
    }

    public BaseResponse(T body, HttpStatus status, Boolean hasException) {
        super(body, status);
        this.hasException = hasException;
    }

    public BaseResponse(T body, MultiValueMap<String, String> headers, HttpStatus status) {
        super(body, headers, status);
    }

    public Boolean hasException() {
        return hasException;
    }

    public void setException(Boolean hasException) {
        this.hasException = hasException;
    }

    @Override
    public boolean equals(Object other) {
        return super.equals(other);
    }

    @Override
    public int hashCode() {
        return super.hashCode();
    }
}

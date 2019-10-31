package com.easyjobs.api.dto.response;

import com.sun.istack.Nullable;
import org.springframework.http.HttpStatus;

public class Response<T> extends BaseResponse<T> {

    private Exception exception;

    public Response(HttpStatus status) {
        super(status);
    }

    public Response(T body) {
        super(body, HttpStatus.OK);
    }

    public Response() {
        super(null, HttpStatus.OK);
    }

    public Response(T body, HttpStatus status, Exception exception) {
        super(body, status);
        if(exception != null){
            super.setException(true);
            this.exception = exception;
        }
    }

    public Response(T body, HttpStatus status) {
        super(body, status);
    }

    public Exception getException() {
        return exception;
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

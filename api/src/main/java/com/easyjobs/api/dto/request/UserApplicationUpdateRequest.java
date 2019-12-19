package com.easyjobs.api.dto.request;


public class UserApplicationUpdateRequest {
    private boolean accepted;
    private boolean resolved;

    public boolean isAccepted() {
        return accepted;
    }

    public void setAccepted(boolean accepted) {
        this.accepted = accepted;
    }

    public boolean isResolved() {
        return resolved;
    }

    public void setResolved(boolean resolved) {
        this.resolved = resolved;
    }
}


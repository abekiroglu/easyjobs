package com.easyjobs.api.dto.request;


import com.easyjobs.api.model.Comment;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;
import java.util.List;

public class ApplicationUpdateRequest {
    private String feedback;
    private boolean isAccepted;
    private boolean isResolved;

    public String getFeedback() {
        return feedback;
    }

    public void setFeedback(String feedback) {
        this.feedback = feedback;
    }

    public boolean getIsAccepted() {
        return isAccepted;
    }

    public void setIsAccepted(boolean accepted) {
        isAccepted = accepted;
    }

    public boolean getIsResolved() {
        return isResolved;
    }

    public void setIsResolved(boolean resolved) {
        isResolved = resolved;
    }
}


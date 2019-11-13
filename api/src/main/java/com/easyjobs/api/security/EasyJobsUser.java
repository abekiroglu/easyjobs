package com.easyjobs.api.security;

import com.easyjobs.api.model.BaseModel;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Date;

public class EasyJobsUser implements UserDetails {
    private final int id;
    private final String email;
    private final boolean isValidated;
    private final Long lastActionTime;
    private final Class type;

    public EasyJobsUser(int id, String email, boolean isValidated, Long lastActionTime, Class type) {
        this.id = id;
        this.email = email;
        this.isValidated = isValidated;
        this.lastActionTime = lastActionTime;
        this.type = type;
    }

    @JsonIgnore
    public Class getType() {
        return type;
    }

    @JsonIgnore
    public Long getLastActionTime() {
        return lastActionTime;
    }

    @JsonIgnore
    public int getId() {
        return id;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getPassword() {
        return null;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return false;
    }

    @Override
    public boolean isAccountNonLocked() {
        return false;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    @Override
    public boolean isEnabled() {
        return isValidated;
    }
}

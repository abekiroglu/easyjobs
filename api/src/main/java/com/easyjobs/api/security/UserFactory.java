package com.easyjobs.api.security;

import com.easyjobs.api.model.Company;
import com.easyjobs.api.model.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.List;
import java.util.stream.Collectors;

public class UserFactory {

    private UserFactory() {
    }

    public static EasyJobsUser create(User user) {
        return new EasyJobsUser(
                user.getId(),
                user.getEmail(),
                user.isValidated(),
                user.getLastActionTime(),
                User.class
        );
    }

    public static EasyJobsUser create(Company company) {
        return new EasyJobsUser(
                company.getId(),
                company.getEmail(),
                company.isValidated(),
                company.getLastActionTime(),
                Company.class
        );
    }

}

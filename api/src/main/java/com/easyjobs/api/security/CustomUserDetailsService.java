package com.easyjobs.api.security;

import com.easyjobs.api.model.Company;
import com.easyjobs.api.model.User;
import com.easyjobs.api.repository.CompanyRepository;
import com.easyjobs.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service("customUserDetailsService")
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CompanyRepository companyRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findOneByEmail(email);

        if (user == null) {
            Company company = companyRepository.findOneByEmail(email);
            if(company != null){
                return UserFactory.create(company);
            }else{
                throw new UsernameNotFoundException(String.format("No user found with email '%s'.", email));
            }
        } else {
            return UserFactory.create(user);
        }
    }

    public void updateLastActionTime(String email){
        User user = userRepository.findOneByEmail(email);

        if (user == null) {
            Company company = companyRepository.findOneByEmail(email);
            if(company != null){
                company.setLastActionTime(Instant.now().getEpochSecond());
                companyRepository.save(company);
            }
        }else{
            user.setLastActionTime(Instant.now().getEpochSecond());
            userRepository.save(user);
        }
    }
}

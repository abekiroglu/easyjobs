package com.easyjobs.api.security;


import com.easyjobs.api.integration.firebase.auth.FirebaseUtil;
import com.google.firebase.FirebaseApp;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;

@Component
public class AuthorizationTokenFilter extends OncePerRequestFilter {

    private final CustomUserDetailsService userDetailsService;
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private final String tokenHeader;

    public AuthorizationTokenFilter(CustomUserDetailsService userDetailsService, @Value("${jwt.header}") String tokenHeader) {
        this.tokenHeader = tokenHeader;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws ServletException, IOException {

        final String requestHeader = request.getHeader(this.tokenHeader);

        String email = null;
        String authToken;
        if (requestHeader != null) {
            authToken = requestHeader;
            try {
                FirebaseToken decodedToken = FirebaseUtil.decodeToken(authToken);
                email = decodedToken.getEmail();

            } catch (FirebaseAuthException e) {
                logger.error(e.getMessage());
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, e.getMessage());
                return;
            }
        } else {
            logger.warn("No bearer found");
        }

        logger.debug("checking authentication for user '{}'", email);
        if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            logger.debug("security context was null, so authorizing user");
            UserDetails userDetails = userDetailsService.loadUserByUsername(email);
            UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
            authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            logger.info("authorized user '{}', setting security context", email);
            SecurityContextHolder.getContext().setAuthentication(authentication);
            userDetailsService.updateLastActionTime(email);
        }
        chain.doFilter(request, response);
    }

}


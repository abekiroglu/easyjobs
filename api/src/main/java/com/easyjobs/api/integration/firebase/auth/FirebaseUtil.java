package com.easyjobs.api.integration.firebase.auth;

import com.google.firebase.FirebaseApp;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class FirebaseUtil {

    private FirebaseApp firebaseApp;

    @Autowired
    public FirebaseUtil(FirebaseApp firebaseApp){
        this.firebaseApp = firebaseApp;
    }

    public static FirebaseToken decodeToken(String token) throws FirebaseAuthException {
        return FirebaseAuth.getInstance().verifyIdToken(token);
    }
}

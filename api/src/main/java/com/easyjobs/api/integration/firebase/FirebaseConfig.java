package com.easyjobs.api.integration.firebase;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.FileInputStream;
import java.io.IOException;

@Configuration
public class FirebaseConfig{
    @Bean
    FirebaseApp createFirebaseApp() throws IOException {
        FileInputStream serviceAccount =
                new FileInputStream("C:\\Users\\ABEKIROGLU14\\Desktop\\easyjobs-fc136-firebase-adminsdk-23ozg-36c9f89c60.json");

        FirebaseOptions options = new FirebaseOptions.Builder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .setDatabaseUrl("https://easyjobs-fc136.firebaseio.com")
                .build();

        return  FirebaseApp.initializeApp(options);
    }

}

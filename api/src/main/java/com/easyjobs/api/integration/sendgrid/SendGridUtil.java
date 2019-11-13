package com.easyjobs.api.integration.sendgrid;

import com.sendgrid.*;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class SendGridUtil {

    private static final String FROM = "noreply@easyjobs.com";

    public static void send(String to, String subject, String emailContent) throws IOException {
        Content content = new Content("text/plain", emailContent);
        Mail mail = new Mail(new Email(FROM), subject, new Email(to), content);

        SendGrid sg = new SendGrid("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");
        Request request = new Request();
        try {
            request.setMethod(Method.POST);
            request.setEndpoint("mail/send");
            request.setBody(mail.build());
            sg.api(request);
        } catch (IOException ex) {
            throw ex;
        }
    }
}


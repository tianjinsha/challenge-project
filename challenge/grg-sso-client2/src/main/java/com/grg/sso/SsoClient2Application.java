package com.grg.sso;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.oauth2.client.EnableOAuth2Sso;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@EnableOAuth2Sso
@SpringBootApplication
public class SsoClient2Application {

    public static void main(String[] args) {
        SpringApplication.run(SsoClient2Application.class, args);
    }

    @GetMapping("/user")
    public Authentication user(Authentication user) {
        return user;
    }

    @GetMapping("/ping")
    public Object ping() {
        return "ping success";
    }

}

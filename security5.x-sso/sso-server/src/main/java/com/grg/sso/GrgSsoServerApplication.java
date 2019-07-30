package com.grg.sso;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableAuthorizationServer;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@EnableAuthorizationServer
@RestController
@SpringBootApplication
public class GrgSsoServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(GrgSsoServerApplication.class, args);
    }


    @GetMapping("/user")
    public Authentication user(Authentication user) {
        return user;
    }
}

package com.grg;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.security.Principal;

/**
 * @author tjshan
 */
@RestController
@EnableDiscoveryClient
@SpringBootApplication
public class GrgAuthApplication {

    public static void main(String[] args) {
        SpringApplication.run(GrgAuthApplication.class, args);
    }

    @GetMapping("/ping")
    public String code(){
        return "success ";
    }

}

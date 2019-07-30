package com.grg.sso.oauth2;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author tjshan
 * @date 2019/7/29 15:22
 */
@RestController
public class IndexController {

    @GetMapping("/ping")
    public String ping(){
        return "ping success";
    }


    @GetMapping("/user")
    public Authentication user(Authentication user) {
        return user;
    }
}

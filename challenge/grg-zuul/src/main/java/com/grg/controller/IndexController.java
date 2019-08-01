package com.grg.controller;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang.StringUtils;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;

/**
 * @author tjshan
 * @date 2019/7/31 19:39
 */
@Slf4j
@RestController
public class IndexController {

    private static final String JWT_SIGNING_KEY="challenge";

    @GetMapping("/ping")
    public String ping(){
        return "ping success";
    }

    @GetMapping("/user")
    public Object user() {
        return "not authorize";
    }

    @GetMapping("/me")
    public Object getCurrentUser(Authentication user, HttpServletRequest request) throws UnsupportedEncodingException {

        String token = StringUtils.substringAfter(request.getHeader("Authorization"), "bearer ");

        Claims claims = Jwts.parser().setSigningKey(JWT_SIGNING_KEY.getBytes("UTF-8"))
                .parseClaimsJws(token).getBody();

        log.info(claims.toString());

        return user;
    }
}

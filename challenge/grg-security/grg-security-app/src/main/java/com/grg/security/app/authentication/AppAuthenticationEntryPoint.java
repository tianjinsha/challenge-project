package com.grg.security.app.authentication;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.grg.common.util.R;
import com.grg.common.util.RespCode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.provider.error.OAuth2AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * 负责启动未经过身份验证的用户的身份验证过程(当他们试图访问受保护的资源)
 * 错误-401
 * @author tjshan
 * @since 2019/7/25 16:51
 */
@Slf4j
@Component("authenticationEntryPoint")
public class AppAuthenticationEntryPoint extends OAuth2AuthenticationEntryPoint {

    @Autowired
    private ObjectMapper objectMapper;

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException e) throws IOException, ServletException {
        log.warn("app:未经身份认证::"+request.getRequestURI()+e.getMessage());
        response.setStatus(HttpStatus.UNAUTHORIZED.value());
        response.setHeader("Content-Type", "application/json;charset=utf-8");

        R<Object> r = new R<>(RespCode.FAIL, HttpStatus.UNAUTHORIZED.getReasonPhrase());
        response.getWriter().write(objectMapper.writeValueAsString(r));
        response.getWriter().flush();

    }
}

package com.grg.security.resource.authentication;

import com.esotericsoftware.kryo.util.ObjectMap;
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
 * @author tjshan
 * @date 2019/8/1 10:22
 */
@Slf4j
@Component
public class ResourceAuthenticationEntryPoint extends OAuth2AuthenticationEntryPoint {


    @Autowired
    private ObjectMapper objectMapper;

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException e) throws IOException, ServletException {
        log.warn("app:未经身份认证::"+request.getRequestURI()+"::"+e.getMessage());
        response.setStatus(HttpStatus.UNAUTHORIZED.value());
        response.setHeader("Content-Type", "application/json;charset=utf-8");
        response.setCharacterEncoding("UTF-8");

        R<Object> r = new R<>(RespCode.FAIL, HttpStatus.UNAUTHORIZED.getReasonPhrase());
        response.getWriter().write(objectMapper.writeValueAsString(r));
        response.getWriter().flush();

    }
}

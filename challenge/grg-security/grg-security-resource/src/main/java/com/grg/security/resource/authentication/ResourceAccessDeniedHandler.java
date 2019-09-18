package com.grg.security.resource.authentication;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.grg.common.util.R;
import com.grg.common.util.RespCode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.oauth2.provider.error.OAuth2AccessDeniedHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * @author tjshan
 *  授权拒绝处理器，覆盖默认的OAuth2AccessDeniedHandler
 * @date 2019/8/1 10:17
 */
@Slf4j
@Component
public class ResourceAccessDeniedHandler extends OAuth2AccessDeniedHandler {

    @Autowired
    private ObjectMapper objectMapper;

    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException e) throws IOException, ServletException {
        response.setStatus(HttpStatus.FORBIDDEN.value());
        log.warn("app:权限不足::"+e.getMessage());
        response.setStatus(HttpStatus.BAD_REQUEST.value());
        response.setHeader("Content-Type", "application/json;charset=utf-8");
        response.setCharacterEncoding("UTF-8");

        R<Object> r = new R<>(RespCode.FAIL, HttpStatus.FORBIDDEN.getReasonPhrase());
        response.getWriter().write(objectMapper.writeValueAsString(r));
        response.getWriter().flush();
    }
}

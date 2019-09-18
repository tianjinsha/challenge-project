package com.grg.security.app.authentication;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.grg.common.util.R;
import com.grg.common.util.RespCode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * 授权失败-坏的凭证
 * 错误-400
 * @author tjshan
 * @since 2019/7/25 16:47
 */
@Slf4j
@Component("accessDeniedHandler")
public class AppAccessDeniedHandler  implements AccessDeniedHandler {

    @Autowired
    private ObjectMapper objectMapper;

    @Override
    public void handle(HttpServletRequest httpServletRequest, HttpServletResponse response, AccessDeniedException e) throws IOException, ServletException {
        response.setStatus(HttpStatus.FORBIDDEN.value());
        log.warn("app:权限不足::"+e.getMessage());
        response.setStatus(HttpStatus.BAD_REQUEST.value());
        response.setHeader("Content-Type", "application/json;charset=utf-8");

        R<Object> r = new R<>(RespCode.FAIL, HttpStatus.FORBIDDEN.getReasonPhrase());
        response.getWriter().write(objectMapper.writeValueAsString(r));
        response.getWriter().flush();
    }
}

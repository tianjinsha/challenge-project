package com.grg.security.browser.logout;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.grg.common.util.R;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang.StringUtils;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * 默认的退出成功处理器，如果设置了signOutUrl，则跳到配置的地址上，
 * 如果没配置，则返回json格式的响应。
 * @author tjshan
 * @date 2019/7/20 10:14
 */
@Slf4j
public class DefaultLogoutSuccessHandler implements LogoutSuccessHandler {

    private String signOutSuccessUrl;

    private ObjectMapper objectMapper = new ObjectMapper();

    public DefaultLogoutSuccessHandler(String signOutSuccessUrl){
        this.signOutSuccessUrl=signOutSuccessUrl;
    }

    @Override
    public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        log.info("退出成功");

        if (StringUtils.isBlank(signOutSuccessUrl)) {
            response.setContentType("application/json;charset=UTF-8");
            response.getWriter().write(objectMapper.writeValueAsString(new R("退出成功")));
        } else {
            response.sendRedirect(signOutSuccessUrl);
        }
    }
}

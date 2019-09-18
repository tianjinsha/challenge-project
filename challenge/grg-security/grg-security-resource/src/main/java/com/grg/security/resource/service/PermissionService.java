package com.grg.security.resource.service;

import org.springframework.security.core.Authentication;

import javax.servlet.http.HttpServletRequest;

/**
 * @author tjshan
 * @date 2019/8/1 11:37
 */
public interface PermissionService {

    /**
     * 判斷角色是否匹配
     * @param request
     * @param authentication
     * @return
     */
    boolean hasPermission(HttpServletRequest request, Authentication authentication);
}

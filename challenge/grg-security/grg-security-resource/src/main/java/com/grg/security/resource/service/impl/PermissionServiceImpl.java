package com.grg.security.resource.service.impl;

import com.grg.security.common.util.DefaultUserDetail;
import com.grg.security.resource.service.PermissionService;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.util.AntPathMatcher;

import javax.servlet.http.HttpServletRequest;
import java.util.Set;

/**
 * @author tjshan
 * @date 2019/8/1 11:39
 */
@Service("permissionService")
public class PermissionServiceImpl implements PermissionService {

    private static final String DEV_ROLE="admin";

    private AntPathMatcher antPathMatcher=new AntPathMatcher();

    @Override
    public boolean hasPermission(HttpServletRequest request, Authentication authentication) {
        Object principal = authentication.getPrincipal();
        authentication.getName();
        boolean hasPermission=false;

        if (principal instanceof DefaultUserDetail){
            if (((DefaultUserDetail) principal).getAuthorities().contains(DEV_ROLE)){
                hasPermission=true;
            }else{
                // 读取用户所拥有权限的所有URL
                Set<String> urls = ((DefaultUserDetail) principal).getUrls();
                for (String url:urls){
                    if (antPathMatcher.match(url, request.getRequestURI())) {
                        hasPermission = true;
                        break;
                    }
                }
            }
        }

        return hasPermission;
    }
}

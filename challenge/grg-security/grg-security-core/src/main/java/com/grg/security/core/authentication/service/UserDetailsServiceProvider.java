package com.grg.security.core.authentication.service;

import com.grg.security.core.exception.AuthException;
import org.springframework.security.core.userdetails.UserDetailsService;

/**
 * @author tjshan
 * @date 2019/7/21 18:07
 */
public interface UserDetailsServiceProvider {

    /**
     * 获取UserDetailsServices实现
     * @param type
     * @return
     * @throws AuthException
     */
    UserDetailsService getService(String type) throws Exception;
}

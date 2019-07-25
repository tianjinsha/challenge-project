package com.grg.security.core.authentication.service;

import org.springframework.security.core.userdetails.UserDetailsService;

/**
 * @author tjshan
 * @date 2019/7/21 18:42
 */
public interface UserDetailServiceChoose extends UserDetailsService {

    /**
     * 选择service类型
     *
     * @return
     */
     String getType();
}

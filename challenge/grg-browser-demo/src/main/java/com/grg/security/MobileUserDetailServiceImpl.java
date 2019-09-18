package com.grg.security;

import com.grg.security.core.authentication.service.UserDetailServiceChoose;
import com.grg.security.core.constant.ServiceType;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

/**
 * 表单登录，社交登录返回user对象服务
 * @author tjshan
 * @date 2019/7/19 9:48
 */
@Slf4j
@Component
public class MobileUserDetailServiceImpl implements UserDetailServiceChoose {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        log.info("手机表单登录用户名为:" + username);
        String password = passwordEncoder.encode("mobile");
        User user = new User(username,
                password,
                true,
                true,
                true,
                true,
                AuthorityUtils.commaSeparatedStringToAuthorityList("admin"));
        return user;
    }

    @Override
    public String getType() {
        return ServiceType.MOBILE.name();
    }
}

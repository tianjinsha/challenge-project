package com.grg.authentication;

import com.grg.security.core.authentication.service.UserDetailServiceChoose;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * @author tjshan
 * @date 2019/8/2 9:21
 */
@Slf4j
@Service
public class MobileUserDetailService implements UserDetailServiceChoose {

    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    public String getType() {
        return "MOBILE";
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        log.info("手机登录用户名为:" + username);
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
}

package com.grg.authentication;

import com.grg.common.vo.UserVO;
import com.grg.feign.UserService;
import com.grg.util.UserDetailsImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * @author tjshan
 * @date 2019/7/31 17:20
 */
@Slf4j
@Service("userDetailService")
public class AuthUserDetailService implements UserDetailsService {

    @Autowired
    private UserService userService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        log.info("auth 登录用户名为:" + username);
        UserVO userVO = userService.findUserByUsername(username);
        return new UserDetailsImpl(userVO);
    }
}

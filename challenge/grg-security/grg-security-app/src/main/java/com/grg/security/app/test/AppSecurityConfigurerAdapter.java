package com.grg.security.app.test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.GlobalAuthenticationConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * @author tjshan
 * @since 2019/7/25 18:21
 */
@Configuration
public class AppSecurityConfigurerAdapter extends GlobalAuthenticationConfigurerAdapter {


    @Autowired
    private UserDetailsService formUserDetailsService;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    public void init(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(formUserDetailsService).passwordEncoder(passwordEncoder);
    }
}

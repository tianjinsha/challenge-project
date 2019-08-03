package com.grg.security;

import com.grg.security.core.authorize.AuthorizeConfigProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.ExpressionUrlAuthorizationConfigurer;
import org.springframework.stereotype.Component;

/**
 * @author tjshan
 * @date 2019/8/2 18:34
 */
@Component
public class AuthAuthorizeConfigProvider implements AuthorizeConfigProvider {
    @Override
    public boolean config(ExpressionUrlAuthorizationConfigurer<HttpSecurity>.ExpressionInterceptUrlRegistry config) {
//        config
//
//                .antMatchers("/oauth/**","/login/**","/logout/**")
//                .permitAll()
//                .and()
//                .authorizeRequests()
//                .antMatchers("/oauth/**").authenticated()
//                .and()
//                //新增login form支持用户登录及授权
//                .formLogin().permitAll();


        config.antMatchers("/oauth/**","/login/**","/logout/**")
                .permitAll();
        return false;
    }
}

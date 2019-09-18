package com.grg.security;

import com.grg.security.common.properties.SecurityProperties;
import com.grg.security.core.authorize.AuthorizeConfigProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.ExpressionUrlAuthorizationConfigurer;
import org.springframework.stereotype.Component;

/**
 * @author tjshan
 * @date 2019/7/23 11:56
 */
@Component
public class BrowserAuthorizeConfigProvider implements AuthorizeConfigProvider {

    @Autowired
    private SecurityProperties securityProperties;
    @Override
    public boolean config(ExpressionUrlAuthorizationConfigurer<HttpSecurity>.ExpressionInterceptUrlRegistry config) {
        config
                .antMatchers(HttpMethod.POST,"/user/register").permitAll()
                .antMatchers("/js/**","/css/**","/favicon.ico"
                ,"/session/invalid.html").permitAll();
        return false;
    }
}

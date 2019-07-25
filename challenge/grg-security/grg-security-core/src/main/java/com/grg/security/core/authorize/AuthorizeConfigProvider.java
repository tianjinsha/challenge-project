package com.grg.security.core.authorize;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.ExpressionUrlAuthorizationConfigurer;

/**
 * 授权配置提供器
 * @author tjshan
 * @date 2019/7/18 21:59
 */
public interface AuthorizeConfigProvider {

    /**
     * 在整个授权配置中，应该有且仅有一个针对anyRequest的配置，如果所有的实现都没有针对anyRequest的配置，
     * 系统会自动增加一个anyRequest().authenticated()的配置。如果有多个针对anyRequest的配置，则会抛出异常
     *
     * @param config
     * @return 返回的boolean表示配置中是否有针对anyRequest的配置。
     */
    boolean config(ExpressionUrlAuthorizationConfigurer<HttpSecurity>.ExpressionInterceptUrlRegistry config);
}

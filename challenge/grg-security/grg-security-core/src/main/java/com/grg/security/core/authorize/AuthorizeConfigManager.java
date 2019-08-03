package com.grg.security.core.authorize;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.ExpressionUrlAuthorizationConfigurer;


/**
 * 授权信息管理器
 * 用于收集系统中所有AuthorizeConfigProvider 并加载其配置
 * @author tjshan
 * @date 2019/7/18 21:57
 */
public interface AuthorizeConfigManager {

    /**
     * 统一授权配置
     * @param config
     */
    void config(ExpressionUrlAuthorizationConfigurer<HttpSecurity>.ExpressionInterceptUrlRegistry config) throws Exception;
}

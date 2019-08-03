package com.grg.security.core.social.support;

import org.springframework.social.security.SocialAuthenticationFilter;

/**
 * 社交认证过滤器后处理器
 * @author tjshan
 * @date 2019/7/23 9:04
 */
public interface SocialAuthenticationFilterPostProcessor {

    /**
     * 设置成功处理器
     * @param socialAuthenticationFilter
     */
    void process(SocialAuthenticationFilter socialAuthenticationFilter);
}

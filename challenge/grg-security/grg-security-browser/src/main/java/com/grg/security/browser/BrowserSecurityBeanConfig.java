package com.grg.security.browser;

import com.grg.security.browser.logout.DefaultLogoutSuccessHandler;
import com.grg.security.browser.session.ChallengeInvalidSessionStrategy;
import com.grg.security.browser.session.ExpiredSessionStrategy;
import com.grg.security.core.properties.SecurityProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.security.web.session.InvalidSessionStrategy;
import org.springframework.security.web.session.SessionInformationExpiredStrategy;

/**
 * @author tjshan
 * @date 2019/7/20 10:21
 */
@Configuration
public class BrowserSecurityBeanConfig {

    @Autowired
    private SecurityProperties securityProperties;

    /**
     * session失效时的处理策略配置
     * @return
     */
    @Bean
    @ConditionalOnMissingBean(InvalidSessionStrategy.class)
    public InvalidSessionStrategy invalidSessionStrategy() {
        ChallengeInvalidSessionStrategy invalidSessionStrategy = new ChallengeInvalidSessionStrategy(securityProperties.getBrowser().getSession().getSessionInvalidUrl());
        invalidSessionStrategy.setSecurityProperties(securityProperties);
        return invalidSessionStrategy;
    }

    /**
     * 并发登录导致前一个session失效时的处理策略配置
     * @return
     */
    @Bean
    @ConditionalOnMissingBean(SessionInformationExpiredStrategy.class)
    public SessionInformationExpiredStrategy sessionInformationExpiredStrategy() {
        ExpiredSessionStrategy expiredSessionStrategy = new ExpiredSessionStrategy(securityProperties.getBrowser().getSession().getSessionInvalidUrl());
        expiredSessionStrategy.setSecurityProperties(securityProperties);
        return expiredSessionStrategy;
    }

    /**
     * 退出时的处理策略配置
     *
     * @return
     */
    @Bean
    @ConditionalOnMissingBean(LogoutSuccessHandler.class)
    public LogoutSuccessHandler logoutSuccessHandler(){
        return new DefaultLogoutSuccessHandler(securityProperties.getBrowser().getSignOutUrl());
    }
}

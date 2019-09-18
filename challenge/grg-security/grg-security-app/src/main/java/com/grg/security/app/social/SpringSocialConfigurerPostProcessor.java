package com.grg.security.app.social;

import com.grg.security.common.properties.SecurityConstants;
import com.grg.security.core.social.support.DefaultSpringSocialConfigurer;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.config.BeanPostProcessor;
import org.springframework.stereotype.Component;

/**
 * @author tjshan
 * @date 2019/8/3 10:10
 */
@Component
public class SpringSocialConfigurerPostProcessor implements BeanPostProcessor {

    private static final String  SOCIAL_SECURITY_CONFIG_NAME="defaultSpringSocialConfigurer";

    /**
     *  (non-Javadoc)
     * @see org.springframework.beans.factory.config.BeanPostProcessor#postProcessBeforeInitialization(java.lang.Object, java.lang.String)
     */
    @Override
    public Object postProcessBeforeInitialization(Object bean, String beanName) throws BeansException {
        return bean;
    }

    /**
     *  (non-Javadoc)
     * @see org.springframework.beans.factory.config.BeanPostProcessor#postProcessAfterInitialization(java.lang.Object, java.lang.String)
     */
    @Override
    public Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException {
        if (StringUtils.equals(beanName, SOCIAL_SECURITY_CONFIG_NAME)) {
            DefaultSpringSocialConfigurer config = (DefaultSpringSocialConfigurer) bean;
            config.signupUrl(SecurityConstants.DEFAULT_SOCIAL_USER_INFO_URL);
            return config;
        }
        return bean;
    }
}

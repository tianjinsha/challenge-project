package com.grg.security.common.properties;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

/**
 * @author tjshan
 * @date 2019/7/18 16:49
 */
@Component
@Data
@ConfigurationProperties(prefix = "challenge.security")
public class SecurityProperties {

    /**
     * 浏览器端配置
     */
    private BrowserProperties browser = new BrowserProperties();

    /**
     * 验证码配置
     */
    private ValidateCodeProperties code = new ValidateCodeProperties();

    /**
     * 社交登录相关配置
     */
    private SocialProperties social = new SocialProperties();


    /**
     * OAuth2认证服务器配置
     */
    private OAuth2Properties oauth2 = new OAuth2Properties();

}

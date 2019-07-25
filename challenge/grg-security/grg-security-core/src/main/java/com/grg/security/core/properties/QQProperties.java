package com.grg.security.core.properties;
import lombok.Data;

/**
 * qq登录配置项
 * @author tjshan
 * @date 2019-7-22 22:10
 */
@Data
public class QQProperties {

    private String appId;

    private String appSecret;

    /**
     * providerId
     */
    private String providerId = "qq";

}

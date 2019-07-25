package com.grg.security.core.properties;

import lombok.Data;

/**
 * @author tjshan
 * @date 2019/7/18 22:21
 */
@Data
public class SocialProperties {
    /**
     * qq配置项
     *
     * @return
     */
    private QQProperties qq = new QQProperties();

    /**
     * 拦截社交登录过滤url
     */
    private String filterProcessesUrl = "/auth";
}

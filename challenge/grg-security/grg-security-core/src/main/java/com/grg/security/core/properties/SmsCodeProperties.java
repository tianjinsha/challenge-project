package com.grg.security.core.properties;

import lombok.Data;

/**
 * 短信验证码配置项
 *  @author tjshan
 *  @date 2019/7/19 20:58
 */
@Data
public class SmsCodeProperties {

    /**
     * 短信验证码的长度
     */
    private int length = 6;

    /**
     * 过期时间
     */
    private int expireIn = 60;

    /**
     * 需要处理的url
     */
    private String url;
}

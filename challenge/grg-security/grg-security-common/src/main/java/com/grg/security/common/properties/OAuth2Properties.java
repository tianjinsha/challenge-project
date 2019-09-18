package com.grg.security.common.properties;

import lombok.Data;


/**
 * @author tjshan
 * @date 2019/7/18 22:21
 */
@Data
public class OAuth2Properties {

    /**
     * 客户端配置
     */
    private OAuth2ClientProperties[] clients = {};

    /**
     * jwt的签名
     */
    private String jwtSigningKey = "challenge";
}

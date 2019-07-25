package com.grg.security.core.social.qq.connect;

import com.grg.security.core.social.qq.api.QQ;
import org.springframework.social.connect.support.OAuth2ConnectionFactory;

/**
 * @author tjshan
 * @date 2019/7/23 8:35
 */
public class QQConnectionFactory extends OAuth2ConnectionFactory<QQ> {
    public QQConnectionFactory(String providerId, String appId, String appSecret) {

        super(providerId, new QQServiceProvider(appId, appSecret), new QQApiAdapter());
    }
}

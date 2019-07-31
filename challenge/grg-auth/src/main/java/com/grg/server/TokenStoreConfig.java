package com.grg.server;

import com.grg.jwt.AppJwtTokenEnhancer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.security.oauth2.provider.token.TokenEnhancer;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.security.oauth2.provider.token.store.JwtAccessTokenConverter;
import org.springframework.security.oauth2.provider.token.store.JwtTokenStore;

/**
 * @author tjshan
 * @date 2019/7/31 21:20
 */
@Configuration
public class TokenStoreConfig {

    private static final String JWT_SIGNING_KEY="challenge";

    /**
     * redis连接工厂
     */
    @Autowired
    private RedisConnectionFactory redisConnectionFactory;

    /**
     * 使用redis存储token的配置，challenge.security.oauth2.tokenStore配置为redis时生效
     * @return
     */
    @Bean
    @ConditionalOnProperty(prefix = "challenge.security.oauth2",
            name = "storeType",
            havingValue = "redis")
    public TokenStore redisTokenStore() {
        return new AppRedisTokenStore(redisConnectionFactory);
    }


    /**
     * jwt的配置
     *
     * 使用jwt时的配置，默认生效
     */
    @Configuration
    @ConditionalOnProperty(prefix = "challenge.security.oauth2",
            name = "storeType",
            havingValue = "jwt",
            matchIfMissing = true)
    public static class JwtTokenConfig {

        @Autowired
        private JwtAccessTokenConverter jwtAccessTokenConverter;

        @Bean
        public TokenStore jwtTokenStore() {
            return new JwtTokenStore(jwtAccessTokenConverter);
        }

        @Bean
        @ConditionalOnBean(TokenEnhancer.class)
        public TokenEnhancer jwtTokenEnhancer(){
            return new AppJwtTokenEnhancer();
        }

        @Bean
        public JwtAccessTokenConverter jwtAccessTokenConverter() {
            JwtAccessTokenConverter converter = new JwtAccessTokenConverter();
            converter.setSigningKey(JWT_SIGNING_KEY);
            return converter;
        }
    }
}

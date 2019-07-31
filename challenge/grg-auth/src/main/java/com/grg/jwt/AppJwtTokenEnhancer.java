package com.grg.jwt;

import org.springframework.security.oauth2.common.DefaultOAuth2AccessToken;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.provider.token.TokenEnhancer;

import java.util.HashMap;
import java.util.Map;

/**
 * 自定义jwt token内的数据
 * jwt token 增强器
 * @author tjshan
 * @date 2019/7/23 18:47
 */
public class AppJwtTokenEnhancer implements TokenEnhancer {
    @Override
    public OAuth2AccessToken enhance(OAuth2AccessToken accessToken, OAuth2Authentication oAuth2Authentication) {

        Map<String, Object> info = new HashMap<>(8);
        info.put("topic","challenge");
        Object principal = oAuth2Authentication.getPrincipal();
        System.out.println(principal);

        ((DefaultOAuth2AccessToken) accessToken).setAdditionalInformation(info);

        return accessToken;
    }
}

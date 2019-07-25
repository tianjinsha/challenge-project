package com.grg.security.core.social.support;

import lombok.Data;

/**
 * @author tjshan
 * @date 2019/7/23 9:05
 */
@Data
public class SocialUserInfo {

    /**
     *  第三方登录的providerId
     */
    private String providerId;

    /**
     *  openid
     */
    private String providerUserId;

    /**
     * 用户的昵称
     */
    private String nickname;

    /**
     * 用户的头像
     */
    private String headimg;
}

package com.grg.security.core.social.qq.connect;

import com.grg.security.core.social.qq.api.QQ;
import com.grg.security.core.social.qq.api.QQUserInfo;
import org.springframework.social.connect.ApiAdapter;
import org.springframework.social.connect.ConnectionValues;
import org.springframework.social.connect.UserProfile;

/**
 * @author tjshan
 * @date 2019/7/23 8:31
 */
public class QQApiAdapter  implements ApiAdapter<QQ> {

    /**
     * 判断请求是否成功
     * @param qq
     * @return
     */
    @Override
    public boolean test(QQ qq) {
        return true;
    }

    @Override
    public void setConnectionValues(QQ api, ConnectionValues values) {
        QQUserInfo qqUserInfo = api.getUserInfo();

        // 设置显示用户名
        values.setDisplayName(qqUserInfo.getNickname());
        // 设置头像url
        values.setImageUrl(qqUserInfo.getFigureurl_qq_1());
        // qq没有个人主页，所以设置为空
        values.setProfileUrl(null);
        // 设置服务商的id  openid
        values.setProviderUserId(qqUserInfo.getOpenId());
    }

    @Override
    public UserProfile fetchUserProfile(QQ qq) {
        return UserProfile.EMPTY;
    }

    @Override
    public void updateStatus(QQ qq, String s) {

    }
}

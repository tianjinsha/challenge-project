package com.grg.security.common.properties;

import lombok.Data;

/**
 * @author tjshan
 * @date 2019/7/18 22:20
 */
@Data
public class BrowserProperties {

    /**
     * session配置
     */
    private SessionProperties session = new SessionProperties();

    /**
     * 登录响应类型
     */
    private ResponseType loginType = ResponseType.JSON;

    /**
     * 响应类型
     */
    private ResponseType responseType=ResponseType.JSON;

    /**
     * 登录成功后跳转的地址，如果设置了此属性，则登录成功后总是会跳到这个地址上。
     * 只在ResponseType为REDIRECT时生效
     */
    private String singInSuccessUrl;

    /**
     * 退出成功时跳转的url，如果配置了，则跳到指定的url，如果没配置，则返回json数据。
     */
    private String signOutUrl;

    /**
     * 登录页
     */
    private String loginPage = "/auth-normal-signIn.html";

    /**
     * 注册页
     */
    private String registerPage = "/auth-signUp.html";

    /**
     * 记住我时间秒数
     */
    private int rememberMeSeconds = 3600;

    /**
     * 记住我是否时第一次开启s
     * 为true 时，将创建 persisten_loginst 数据表
     */
    private boolean persistent_login_first=false;

}

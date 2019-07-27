package com.grg.security.app.exception;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.springframework.security.oauth2.common.exceptions.OAuth2Exception;

/**
 * 自定义oauth2异常
 *
 * @author tjshan
 * @since 2019/7/25 16:24
 */
@JsonSerialize(using = AppOauthExceptionSerializer.class)
public class AppOauthException extends OAuth2Exception {

    public AppOauthException(String msg) {
        super(msg);
    }
}
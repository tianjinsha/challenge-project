package com.grg.security.core.valiate;

import org.springframework.security.core.AuthenticationException;

/**
 * 验证码异常
 * 继承身份验证异常的基类
 * @author tjshan
 * @date 2019/7/19 20:52
 */
public class ValidateCodeException extends AuthenticationException {

    public ValidateCodeException(String msg) {
        super(msg);
    }
}

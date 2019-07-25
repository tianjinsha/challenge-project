package com.grg.security.core.valiate.sms;

import lombok.extern.slf4j.Slf4j;

/**
 * 默认的短信验证码发送方法实现
 *  @author tjshan
 *  @date 2019/7/19 21:09
 */
@Slf4j
public class DefaultSmsCodeSender implements SmsCodeSender {

    /**
     * 发送方法逻辑
     * @param mobile 手机号
     * @param code 验证码
     */
    @Override
    public void send(String mobile, String code) {
        log.info("向手机"+mobile+"发送短信验证码"+code);
    }
}

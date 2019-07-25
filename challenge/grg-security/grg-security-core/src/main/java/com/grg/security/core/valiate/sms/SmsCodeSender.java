package com.grg.security.core.valiate.sms;

/**
 * 短信发送接口
 * @author tjshan
 * @date 2019/7/19 21:09
 */
public interface SmsCodeSender {

    /**
     * 发送方法
     * @param mobile 手机号
     * @param code 验证码
     */
    void send(String mobile, String code);

}

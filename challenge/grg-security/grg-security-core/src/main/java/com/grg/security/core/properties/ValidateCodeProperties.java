package com.grg.security.core.properties;

import lombok.Data;

/**
 * @author tjshan
 * @date 2019/7/18 22:22
 */
@Data
public class ValidateCodeProperties {

    /**
     * 图片验证码选项
     */
    private ImageCodeProperties imageCode = new ImageCodeProperties();

    /**
     * 短信验证码
     */
    private SmsCodeProperties smsCode = new SmsCodeProperties();
}

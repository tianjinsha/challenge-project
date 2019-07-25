package com.grg.security.core.properties;

import lombok.Data;

/**
 * 图片验证码选项
 *  @author tjshan
 *  @date 2019/7/19 20:58
 */
@Data
public class ImageCodeProperties extends SmsCodeProperties {

    public ImageCodeProperties() {
        setLength(4);
    }

    /**
     * 验证码的宽
     */
    private int width = 67;

    /**
     * 验证码的高
     */
    private int height = 23;

}

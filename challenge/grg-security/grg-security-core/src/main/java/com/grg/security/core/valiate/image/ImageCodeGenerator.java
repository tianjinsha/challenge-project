package com.grg.security.core.valiate.image;

import com.google.code.kaptcha.impl.DefaultKaptcha;
import com.grg.security.core.valiate.ValidateCode;
import com.grg.security.core.valiate.ValidateCodeGenerator;
import com.grg.security.core.properties.SecurityProperties;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.context.request.ServletWebRequest;

import java.awt.image.BufferedImage;

/**
 * 图片验证码生成器
 * @author tjshan
 * @date 2019/7/19 21:13
 */
@Data
@Slf4j
public class ImageCodeGenerator implements ValidateCodeGenerator {

    private SecurityProperties securityProperties;

    @Autowired
    private DefaultKaptcha captchaProducer;

    @Override
    public ValidateCode generate(ServletWebRequest request) {
        String sRand = captchaProducer.createText();
        log.info(sRand);
        BufferedImage image = captchaProducer.createImage(sRand);
        return new ImageCode(image, sRand, securityProperties.getCode().getImageCode().getExpireIn());
    }
}

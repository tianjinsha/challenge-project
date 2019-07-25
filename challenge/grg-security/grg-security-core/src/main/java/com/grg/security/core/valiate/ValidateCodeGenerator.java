package com.grg.security.core.valiate;

import org.springframework.web.context.request.ServletWebRequest;

/**
 * 验证码接口
 * @author tjshan
 * @date 2019/7/19 21:10
 */
public interface ValidateCodeGenerator {
    /**
     * 图形验证码实现方法接口
     * @param request
     * @return
     */
    ValidateCode generate(ServletWebRequest request);

}

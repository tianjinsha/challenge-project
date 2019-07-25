package com.grg.security.core.valiate.impl;

import com.grg.security.core.valiate.ValidateCode;
import com.grg.security.core.valiate.ValidateCodeRepository;
import com.grg.security.core.valiate.ValidateCodeType;
import org.springframework.web.context.request.ServletWebRequest;

/**
 * @author tjshan
 * @date 2019/7/19 22:09
 */
public class RedisValidateCodeRepository implements ValidateCodeRepository {


    @Override
    public void save(ServletWebRequest request, ValidateCode code, ValidateCodeType validateCodeType) {

    }

    @Override
    public ValidateCode get(ServletWebRequest request, ValidateCodeType validateCodeType) {
        return null;
    }

    @Override
    public void remove(ServletWebRequest request, ValidateCodeType codeType) {

    }
}

package com.grg.security.core.valiate;

import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * 验证码父类
 * @author tjshan
 * @date 2019/7/19 20:49
 */
@Data
public class ValidateCode implements Serializable {

    private String code;

    private LocalDateTime expireTime;

    public ValidateCode(String code, int expireIn){
        this.code = code;
        this.expireTime = LocalDateTime.now().plusSeconds(expireIn);
    }

    public ValidateCode(String code, LocalDateTime expireTime){
        this.code = code;
        this.expireTime = expireTime;
    }


    public boolean isExpried() {
        return LocalDateTime.now().isAfter(expireTime);
    }
}

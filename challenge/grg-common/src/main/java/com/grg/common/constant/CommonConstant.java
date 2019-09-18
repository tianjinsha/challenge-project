package com.grg.common.constant;

/**
 * @author tjshan
 * @date 2019/8/1 9:27
 */
public interface CommonConstant {

    /**
     * token请求头名称
     */
    String REQ_HEADER = "Authorization";

    /**
     * token分割符
     */
    String TOKEN_SPLIT = "bearer ";

    /**
     * jwt签名
     */
    String SIGN_KEY = "challenge";

    /**
     * 删除
     */
    String STATUS_DEL = "1";
    /**
     * 正常
     */
    String STATUS_NORMAL = "0";

    /**
     * 锁定
     */
    String STATUS_LOCK = "9";
}

package com.grg.common.util;

/**
 * 返回常量
 * @author tjshan
 * @date 2019/7/18 22:50
 */
public enum  RespCode {
    //公共
    ERROR(-1,"unknown error"),
    SUCCESS(0, "success"),
    FAIL(1, "fail"),
    SYSTEM_EXCEPTION(4,"system error"),
    INVALID_PARAMETER(5,"parameter error"),
    DB_ERROR(6,"database error"),

    NOT_LOGIN(101,"not login"),
    UNAUTHORIZED(102,"unauthorized"),
    AUTH_EXPIRED(103,"authentication expire"),
    NO_PERMISSION(104,"permission denied"),
    INVALID_TOKEN(105,"invalid token"),
    NO_ROLE(106,"no role"),
    INVALID_SESSION(107,"invalid session");




    private int code;
    private String msg;

    RespCode(int code, String msg) {
        this.msg = msg;
        this.code = code;
    }

    public int getCode() {
        return code;
    }
    public String getMsg() {
        return msg;
    }
}

package com.grg.common.util;

import lombok.Data;

import java.io.Serializable;

/**
 * 响应信息主体
 * @author tjshan
 * @date 2019/7/18 22:39
 */
@Data
public class R<T> implements Serializable {

    private static final long serialVersionUID = 1L;


    public static final int SUCCESS = 0;

    public static final int FAIL = 1;

    private String msg = "success";

    private int code = SUCCESS;

    private T data;

    public R() {
        super();
    }

    public R(T data) {
        super();
        this.data = data;
    }

    public R(T data, String msg) {
        super();
        this.data = data;
        this.msg = msg;
    }

    public R(RespCode rCode) {
        super();
        setRespCode(rCode);
    }
    public R(RespCode rCode,T data) {
        super();
        setRespCode(rCode);
        this.data = data;
    }

    public R(RespCode rCode,String data) {
        super();
        setRespCode(rCode);
        this.data = (T) data;
    }

    public R(Throwable e) {
        super();
        this.msg = e.getMessage();
        this.code = FAIL;
    }

    public void setRespCode(RespCode rCode) {
        this.code = rCode.getCode();
        this.msg = rCode.getMsg();
    }
}

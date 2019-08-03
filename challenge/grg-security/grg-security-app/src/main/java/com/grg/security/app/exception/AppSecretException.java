package com.grg.security.app.exception;

/**
 * @author tjshan
 * @date 2019/8/3 10:08
 */
public class AppSecretException extends RuntimeException {

    /**
     *
     */
    private static final long serialVersionUID = -1629364510827838114L;

    public AppSecretException(String msg) {
        super(msg);
    }
}

package com.grg.security.common.util;

import org.springframework.security.core.userdetails.UserDetails;
import java.util.Set;

/**
 * @author tjshan
 * @date 2019/8/1 14:00
 */
public interface DefaultUserDetail extends UserDetails {

    /**
     * 用户有权访问的所有url
     * @return the urls
     */
    Set<String> getUrls();

}

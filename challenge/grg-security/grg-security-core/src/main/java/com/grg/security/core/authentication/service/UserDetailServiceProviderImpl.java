package com.grg.security.core.authentication.service;

import com.grg.security.core.exception.AuthException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * @author tjshan
 * @date 2019/7/21 18:40
 */
@Component("userDetailsServiceProvider")
@Slf4j
public class UserDetailServiceProviderImpl implements UserDetailsServiceProvider{

    @Autowired()
    List<UserDetailServiceChoose> userDetailServiceChooses;

    @Override
    public UserDetailsService getService(String type) throws Exception {

        for (UserDetailServiceChoose serviceChooses :userDetailServiceChooses){
            if (serviceChooses.getType()==null){
                throw new Exception("UserDetailServiceChoose实现方法中返回值不得为空");
            }
            if (serviceChooses.getType().equals(type)){
                return  serviceChooses;
            }
        }
        throw new AuthException("请提供["+type+"]的UserDetailServiceChoose接口实现");
    }
}

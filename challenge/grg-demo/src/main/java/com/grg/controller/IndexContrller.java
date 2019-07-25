package com.grg.controller;

import com.grg.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.social.connect.web.ProviderSignInUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.ServletWebRequest;

import javax.servlet.http.HttpServletRequest;

/**
 * @author tjshan
 * @date 2019/7/19 22:28
 */
@RestController
public class IndexContrller {

    @Autowired
    private ProviderSignInUtils providerSignInUtils;

    @GetMapping("/ping")
    public String ping (){
        return "ping success !";
    }


    @PostMapping("/user/register")
    public void register(User user, HttpServletRequest request) {

        //不管是注册用户还是绑定用户，都会拿到一个用户唯一标识。
        String userId = user.getUsername();
        providerSignInUtils.doPostSignUp(userId, new ServletWebRequest(request));
    }
}

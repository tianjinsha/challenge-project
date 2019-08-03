package com.grg.service;

import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.grg.mapper.UserMapper;
import com.grg.model.SysUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author tjshan
 * @date 2019/8/3 15:49
 */
@Service
public class UserService extends ServiceImpl<UserMapper, SysUser> {

    @Autowired
    private UserMapper userMapper;

    private SysUser findUserByName(String username){
        return userMapper.findUserByUsername(username);
    }

}

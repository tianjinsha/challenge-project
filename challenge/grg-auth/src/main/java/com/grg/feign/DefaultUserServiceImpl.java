package com.grg.feign;

import com.grg.common.vo.SysRole;
import com.grg.common.vo.UserVO;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

/**
 * @author tjshan
 * @date 2019/8/1 15:08
 */
@Service
public class DefaultUserServiceImpl implements UserService{

    private PasswordEncoder passwordEncoder= PasswordEncoderFactories.createDelegatingPasswordEncoder();

    private Map<String,UserVO> users=new HashMap<>();

    DefaultUserServiceImpl(){
        SysRole role1=new SysRole();
        role1.setRoleName("超级用户");
        role1.setRoleCode("admin");
        SysRole role2=new SysRole();
        role2.setRoleName("普通用户");
        role2.setRoleCode("ROLE_USER");

        UserVO u1=new UserVO();
        u1.setUserId(1);
        u1.setUsername("admin");
        u1.setDelFlag("0");
        u1.setPassword(passwordEncoder.encode("123456"));
        u1.setRoleList(Arrays.asList(role1,role2));

        UserVO u2=new UserVO();
        u2.setUserId(2);
        u2.setUsername("normal");
        u2.setDelFlag("0");
        u2.setPassword(passwordEncoder.encode("123456"));
        u2.setRoleList(Arrays.asList(role1));

        UserVO u3=new UserVO();
        u3.setUserId(3);
        u3.setUsername("user");
        u3.setDelFlag("0");
        u3.setPassword(passwordEncoder.encode("123456"));
        u3.setRoleList(Arrays.asList(role2));

        users.put("admin",u1);
        users.put("normal",u2);
        users.put("user",u3);
    }


    @Override
    public UserVO findUserByUsername(String username) {
        return users.get(username);
    }

    @Override
    public UserVO findUserByMobile(String mobile) {
        return null;
    }
}

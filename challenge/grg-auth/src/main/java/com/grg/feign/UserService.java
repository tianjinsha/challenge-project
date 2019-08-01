package com.grg.feign;

import com.grg.common.vo.UserVO;

/**
 * @author tjshan
 * @date 2019/8/1 14:58
 */
public interface UserService {

    /**
     * 通过用户名查询用户信息
     * @param username
     * @return
     */
    UserVO findUserByUsername(String username);

    /**
     * 通过电话号码查询用户信息
     * @param mobile
     * @return
     */
    UserVO findUserByMobile(String mobile);

}

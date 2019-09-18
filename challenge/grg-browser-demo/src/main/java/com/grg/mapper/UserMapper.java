package com.grg.mapper;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.grg.model.SysUser;
import org.springframework.stereotype.Repository;

/**
 * @author tjshan
 * @date 2019/8/3 15:52
 */
@Repository
public interface UserMapper extends BaseMapper<SysUser> {

    /**
     * byUsername
     * @param username username
     * @return SysUser
     */
    SysUser findUserByUsername(String username);
}

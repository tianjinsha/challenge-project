package com.grg.model;

import com.baomidou.mybatisplus.activerecord.Model;
import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.annotations.TableName;
import com.baomidou.mybatisplus.enums.IdType;
import lombok.Data;

import java.io.Serializable;

/**
 * @author tjshan
 * @date 2019/7/23 11:44
 */
@Data
@TableName("user")
public class SysUser extends Model<SysUser> {

    @TableId(type = IdType.AUTO)
    private int id;
    @TableField(value = "username")
    private String username;

    @TableField(value = "password")
    private String password;

    @Override
    protected Serializable pkVal() {
        return id;
    }
}

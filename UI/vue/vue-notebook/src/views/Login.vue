<template>
  <div class="Login">
    <header>
      <div class="header-wrap">
        <div class="left">
          <img src="../assets/images/favicon.png" alt="笔记" />
          <h3>vue笔记本</h3>
        </div>
        <div class="right">
          <a href="#">首页</a>
          <span>|</span>
          <a href="#">联系我们</a>
        </div>
      </div>
    </header>
    <section>
      <div class="login-wrap">
        <div class="login-left">
          <div class="login-container">
            <div class="login-type-select">
              <span :class="{'login-type':true, 'selected':active1}" @click="selectType(1)">账户密码登录</span>
              <span class="login-type-split"></span>
              <span :class="{'login-type':true, 'selected':active2}" @click="selectType(2)">手机验证码登录</span>
            </div>
            <!--  -->
            <div v-bind:class="{'login-form':true, 'active':active1}">
              <el-input class="text-row" placeholder="账号" v-model="account"></el-input>
              <el-input class="text-row" placeholder="密码" v-model="password" type="password"></el-input>
              <div class="check-row">
                <el-checkbox v-model="remeberme">记住密码</el-checkbox>
                <a href="#" class="login-nopassword">忘记密码？</a>
              </div>
              <div class="button-row">
                <el-button type="primary">登录</el-button>
                <el-button type="primary">注册</el-button>
              </div>
            </div>
            <!--  -->
            <div v-bind:class="{'login-form':true, 'active':active2}">
              <el-input class="text-row" placeholder="请输入手机号码" v-model="account"></el-input>
              <div class="verify-row">
                <el-input class="text-row code" placeholder="请输入验证码" v-model="account"></el-input>
                <el-button type="primary">获取验证码</el-button>
              </div>
              <div class="button-row">
                <el-button type="primary">登录</el-button>
              </div>
            </div>
          </div>
        </div>
        <!--  -->
        <div class="login-right">
          <h2>其他账号登录：</h2>
          <div class="login-other">
            <div class="btn qq">
              <img src="../assets/images/qq-24.png" alt />
              <span>使用qq账号登录</span>
            </div>
            <div class="btn wechat">
              <img src="../assets/images/wechat-24.png" alt />
              <span>使用微信账号登录</span>
            </div>
            <div class="btn sina">
              <img src="../assets/images/sina-24.png" alt />
              <span>使用新浪微博账号登录</span>
            </div>
            <div class="btn netease">
              <img src="../assets/images/netease-24.png" alt />
              <span>使用网易邮箱账号登录</span>
            </div>
          </div>
        </div>
        <!--  -->
        <div class="login-middle"></div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      account: "",
      password: "",
      remeberme: false,
      active1: true,
      active2: false
    };
  },
  methods: {
    selectType(type) {
      console.log("select type is " + type);
      if (type == 1) {
        this.active1 = true;
        this.active2 = false;
      } else if (type == 2) {
        this.active1 = false;
        this.active2 = true;
      }
    }
  },
  props: {}
};
</script>

<style scoped lang="less">
.login {
  background: #eee;
}
header {
  height: 60px;
  line-height: 60px;
  background: #409eff;
  .header-wrap {
    max-width: 1024px;
    margin: 0 auto;
    .left {
      float: left;
      display: flex;
      align-items: center;
      width: 200px;
      img {
        display: block;
        width: 40px;
        height: 40px;
      }
      h3 {
        margin-left: 10px;
        flex: 1 0 auto;
        color: #f1f1f1;
        font-size: 24px;
        letter-spacing: 1px;
        font-weight: 600;
      }
    }
    .right {
      float: right;
      color: #f1f1f1;
      a {
        color: #f1f1f1;
        margin: 0 5px;
      }
    }
  }
}
section {
  width: 100%;
  .login-wrap {
    width: 900px;
    height: 410px;
    margin: 80px auto;
    border: 1px solid #f1f2f2;
    background-color: #fff;
    box-shadow: 0 0 18px 0 rgba(57, 141, 238, 0.12);
  }
  .login-left {
    padding: 35px 77px 42px 57px;
    float: left;
    .login-type-select {
      font-size: 18px;
      margin-bottom: 30px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      box-sizing: border-box;
      :hover {
        color: #398dee;
        border-bottom: 2px solid #398dee;
      }
      .selected {
        color: #398dee;
        border-bottom: 2px solid #398dee;
      }
      .login-type {
        cursor: pointer;
        padding-bottom: 10px;
      }
      .login-type-split {
        height: 18px;
        border-right: solid 1px rgba(216, 216, 216, 0.61);
      }
    }
    .active {
      display: block !important;
    }
    .login-form {
      display: none;
      .text-row {
        display: block;
        line-height: 30px;
        outline: none;
        font-size: 12px;
        box-sizing: border-box;
        height: 72px;
        width: 296px;
      }
      .check-row {
        font-size: 14px;
        .login-nopassword {
          color: #9bc1f1;
          float: right;
        }
      }
      .verify-row {
        .code {
          float: left;
          width: 170px;
        }
        .el-button {
          float: right;
        }
      }
      .button-row {
        clear: both;
        padding: 0;
        display: flex;
        justify-content: space-between;
        margin: 12px 0;
        .el-button {
          flex: 1 1 auto;
        }
      }
    }
  }
  .login-middle {
    background-color: rgba(216, 216, 216, 0.61);
    width: 1px;
    height: 334px;
    margin-top: 41px;
    float: right;
  }
  .login-right {
    float: right;
    padding: 35px 65px 34px 65px;
    h2 {
      font-size: 18px;
      margin-bottom: 30px;
      font-weight: normal;
    }
    .btn {
      display: flex;
      align-items: center;
      width: 298px;
      height: 40px;
      margin-bottom: 10px;
      border: 1px solid #d6d6d6;
      border-radius: 3px;
      color: #9bc1f1;
      background-color: #ffffff;
      box-sizing: border-box;
      line-height: 40px;
      padding-left: 70px;
      cursor: pointer;
      font-size: 12px;
      img {
        display: inline-block;
        margin-right: 5px;
      }
    }
  }
}
</style>

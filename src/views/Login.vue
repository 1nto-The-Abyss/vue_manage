<template>
  <div class="login">
    <el-card>
      <div slot="header">系统登录</div>
      <div>
        <el-form ref="login" :model="user" :rules="rules" label-width="100px">
          <el-form-item label="账号" prop="username">
            <el-input v-model="user.username" placeholder="请输入账号"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="user.password" type="password" placeholder="请输入密码">
              <!-- <i slot="suffix" class="el-input__icon" :class="isShow?'el-icon-view':'el-icon-loading'" @click="showPassword"></i> -->
            </el-input>
          </el-form-item>
          <el-form-item class="button">
            <el-button type="primary" @click="submit">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>
<script>
import Mock from 'mockjs'
import Cookies from 'js-cookie'
import { getMenu } from '../api/index'
export default {
  name: "Login",
  data(){
   return {
    user: {
      username: "",
      password: ""
    },
    rules: {
      username: [
        {required: true, message:'请输入用户名', trigger: 'blur'}
      ],
      password: [
        {required: true, message:'请输入密码', trigger: 'blur'}
      ]
    },
    isShow: false
   }
  },
  methods:{
    submit() {
      // const token = Mock.Random.guid()

      this.$refs.login.validate((valid) => {
        if(valid) {
          getMenu(this.user).then(({ data }) => {
            if(data.code === 20000) {
              Cookies.set('token',data.data.token)
              // 获取菜单
              this.$store.commit('setMenu', data.data.menu)
              this.$store.commit('addMenu',this.$router)
              this.$router.push("/home")
            } else {
              this.$message({
                message: data.data.message,
                type: 'error'
              });
            }
          })
        }
      })
    }
  }
}
</script>
<style scoped lang="less">
.login {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.el-card {
  width: 400px;
  height: 350px;
  border-radius: 20px;
  &__header {
    padding: 20px 0;
    div {
      padding: 10px 0;
      font-weight: 600;
      font-size: 20px;
      text-align: center;
    }
  }
  .el-form {
    margin-top: 20px
  }
  .el-input {
    width: 200px;
  }
  .button {
    margin-top: 40px;
    display: flex;
    justify-content: center;
    ::v-deep .el-form-item__content {
      margin-left: 0 !important;
    }
    .el-button {
      width: 120px;
    }
  }
}
</style>
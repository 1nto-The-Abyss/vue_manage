<template>
  <div class="header-container">
    <div class="l-content">
      <el-button icon="el-icon-menu" size="mini" @click="handleMenu"></el-button>
      <!-- 面包屑 -->
      <span class="text">首页</span>
    </div>
    <div class="r-content">
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-avatar :src="avatarImg"></el-avatar>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人信息</el-dropdown-item>
          <el-dropdown-item>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import avatarImg from "../assets/images/avatar.png"
export default {
  name: "CommonHeader",
  data() {
    return {
      avatarImg: avatarImg,
    };
  },
  methods: {
    handleMenu() {
      this.$store.commit('collapseMenu')
    }
  }
};
</script>
<style scoped lang="less">
.header-container {
  height: 60px;
  background-color: #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .l-content {
    .el-button {
      margin: 0 30px;
    }
    .text {
      color: #fff;
      font-size: 14px;
    }
  }
  .r-content {
    margin-right: 28px;
  }
}
</style>
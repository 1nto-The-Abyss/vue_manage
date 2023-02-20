<template>
  <div class="header-container">
    <div class="l-content">
      <el-button icon="el-icon-menu" size="mini" @click="handleMenu"></el-button>
      <!-- 面包屑 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item
        v-for="item in tags"
        :key="item.path" 
        :to="{ path: item.path }">{{item.label}}</el-breadcrumb-item>
      </el-breadcrumb>
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
import {mapState } from 'vuex'
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
  },
  computed: {
    ...mapState({
      tags: state => state.tab.tabList
    })
  },
  mounted() {
    console.log(this.tags);
  },
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
    display: flex;
    align-items: center;
    .el-button {
      margin: 0 30px;
    }
    .text {
      color: #fff;
      font-size: 14px;
    }
    ::v-deep .el-breadcrumb__item {
      .el-breadcrumb__inner {
        font-weight: 400;
        &.is-link {
          color: #666;
        }
      }
      &:last-child {
        .el-breadcrumb__inner {
          color: #fff;
        }
      }
    }
  }
  .r-content {
    margin-right: 28px;
  }
}
</style>
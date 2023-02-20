<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    :collapse="isCollapse">
    <div v-show="isCollapse" class="title">
      <i class="el-icon-s-unfold"></i>
    </div>
    <div v-show="!isCollapse">
      <h3>后台管理系统</h3>
    </div>
    <!-- 没有子菜单 -->
    <el-menu-item 
    v-for="item in noChildren" 
    :key="item.name" 
    :index="item.name" 
    @click="clickMenu(item)">
      <i :class="`el-icon-${item.icon}`"></i>
      <span slot="title">{{item.label}}</span>
    </el-menu-item>
    <el-submenu 
    v-for="item in haveChildren" 
    :key="item.label" 
    :index="item.label">
      <template slot="title">
        <i :class="`el-icon-${item.icon}`"></i>
        <span slot="title">{{item.label}}</span>
      </template>
      <el-menu-item-group v-for="subItem in item.children" :key="subItem.name">
        <el-menu-item :index="subItem.name" @click="clickMenu(subItem)">{{subItem.label}}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>
<script>
export default {
  name: "CommonAside",
  data() {
    return {
      menuData: [
        {
          path: "/",
          name: "home",
          label: "首页",
          icon: "s-home",
          url: "Home/Home"
        },
        {
          path: "/mall",
          name: "mall",
          label: "商品管理",
          icon: "s-goods",
          url: "MallManage/MallManage"
        },
        {
          path: "/user",
          name: "user",
          label: "用户管理",
          icon: "user-solid",
          url: "UserManage/UserManage"
        },
        {
          label: "其他",
          icon: "location",
          children: [
            {
              path: "/page1",
              name: "page1",
              label: "页面1",
              icon: "setting",
              url: "Other/PageOne"
            },
            {
              path: "/page2",
              name: "page2",
              label: "页面2",
              icon: "setting",
              url: "Other/PageTwo"
            }
          ]
        }
      ]
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    clickMenu(item) {
      // 避免重复跳转当前页
      if(item.path !== this.$route.path && !(this.$route.path==='/home' && item.path==='/')) {
        this.$router.push(item.path)
      }
      this.$store.commit("selectMenu",item)
    }
  },
  computed: {
    // 没有子菜单
    noChildren() {
      return this.menuData.filter( item => !item.children)
    },
    // 有子菜单
    haveChildren() {
      return this.menuData.filter( item => item.children)
    },
    isCollapse() {
      return this.$store.state.tab.isCollapse
    }
  }
};
</script>
<style scoped lang="less">
.el-menu-vertical-demo {
  border-right: 0 !important;
  &:not(.el-menu--collapse) {
    width: 200px;
  }
}
.el-menu {
  height: 100vh;
}
.title {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  .el-icon-s-unfold {
    font-size: 28px;
    color: #909399;
  }
}
h3 {
  color:#fff;
  text-align: center;
  margin: 10px 0;
}
</style>
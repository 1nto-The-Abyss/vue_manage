<template>
  <div>
    <el-container>
      <el-aside :width="isCollapse?'':'200px'">
        <common-aside></common-aside>
      </el-aside>
      <el-container>
        <el-header>
          <common-header></common-header>
        </el-header>
        <common-tag></common-tag>
        <el-main>
          <!-- 子路由出口 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import CommonAside from "@/components/CommonAside";
import CommonHeader from "@/components/CommonHeader";
import CommonTag from "@/components/CommonTag"
import { getData } from "@/api/index";
export default {
  name: "Main",
  components: {
    CommonAside,
    CommonHeader,
    CommonTag
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {
    getData().then(data => {
      console.log(data);
    });
  },
  computed: {
    isCollapse() {
      return this.$store.state.tab.isCollapse;
    }
  }
};
</script>
<style scoped lang="less">
.el-header {
  padding: 0;
}
</style>
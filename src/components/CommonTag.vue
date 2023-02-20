<template>
  <div class="tag">
    <el-tag
      v-for="tag in tags"
      :key="tag.name"
      :closable="tag.name !== 'home'"
      :effect="$route.name == tag.name ? 'dark':'plain'">
      {{tag.label}}
    </el-tag>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: "CommonTag",
  data() {
    return {};
  },
  methods: {},
  computed: {
    ...mapState({
      tags: state => state.tab.tabList 
    })
  }
};
</script>
<style scoped lang="less">
.tag {
  display: flex;
  margin: 20px 0 0 20px;
  .el-tag {
    margin: 0 5px;
  }
}
</style>
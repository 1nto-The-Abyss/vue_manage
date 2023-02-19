export default {
  state: {
    isCollapse: false // 控制菜单折叠
  },
  mutations: {
    collapseMenu(state) {
      state.isCollapse = !state.isCollapse
    }
  }
}
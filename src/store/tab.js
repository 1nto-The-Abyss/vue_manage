export default {
  state: {
    isCollapse: false, // 控制菜单折叠
    tabList: [
      {
        path: "/",
        name: "home",
        label: "首页",
        icon: "s-home",
        url: "Home/Home"
      }
    ]
  },
  mutations: {
    collapseMenu(state) {
      state.isCollapse = !state.isCollapse
    },
    selectMenu(state, val) {
      if (val.name !== 'home' && state.tabList.every(item => item.name !== val.name)) {
        state.tabList.push(val)
      } 
    }
  }
}
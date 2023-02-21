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
    ],
    menu: []
  },
  mutations: {
    collapseMenu(state) {
      state.isCollapse = !state.isCollapse
    },
    selectMenu(state, val) {
      if (val.name !== 'home' && state.tabList.every(item => item.name !== val.name)) {
        state.tabList.push(val)
      } 
    },
    // 设置menu
    setMenu(state,val) {
      state.menu = val
      sessionStorage.setItem('menu',JSON.stringify(val))
    },
    // 动态注册路由
    addMenu(state, router) {
      // 判断缓存中是否有menu数据
      if(!sessionStorage.getItem('menu'))  return
      const menu = JSON.parse(sessionStorage.getItem('menu'))
      state.menu = menu
      const menuArray = []
      menu.forEach(item => {
        if(item.children) {
          item.children = item.children.map(item => {
            item.component = () => import(`../views/${item.url}`)
            return item
          })
          menuArray.push(...item.children)
        } else {
          item.component = () => import(`../views/${item.url}`)
          menuArray.push(item)
        }
      })
      menuArray.forEach(item => {
        router.addRoute('main',item)
      })
    }
  }
}
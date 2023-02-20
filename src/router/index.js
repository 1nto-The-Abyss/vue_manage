import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter) 

const Main = () => import('../views/Main')
const Home = () => import('../views/Home')
const User = () => import('../views/User')
const Mall = () => import('../views/Mall')
const PageOne = () => import('../views/PageOne')
const PageTwo = () => import('../views/PageTwo')
const router = new VueRouter({
  routes:[
    {
      path: '/',
      component: Main,
      redirect: '/home',
      children: [
        {
          path:'home',
          name: 'home',
          component: Home
        },
        {
        path:'user',
        name:'user',
        component: User
        },
        {
          path:'mall',
          name:'mall',
          component: Mall
        },
        {
          path:'page1',
          name:'page1',
          component: PageOne
        },
        {
          path:'page2',
          name:'page2',
          component: PageTwo
        }
      ]
    },

]
})

export default router

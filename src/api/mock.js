import Mock from "mockjs";
import homeApi from './mockServeData/home'
import userApi from './mockServeData/user'
import permissionApi from "./mockServeData/permission";
// 定义mock请求拦截
// 请求首页数据
Mock.mock('/api/home/getData', homeApi.getStatisticalData)

// 请求用户数据
// 分页时调用接口拼接上了page和limit，字符串形式匹配不到，要用正则表达式匹配
Mock.mock(/api\/user\/getUserList/,userApi.getUserList)
Mock.mock('/api/user/createUser','post',userApi.createUser)
Mock.mock('/api/user/deleteUser','post',userApi.deleteUser)
Mock.mock('/api/user/updateUser','post',userApi.updateUser)

// 获取权限目录
Mock.mock(/api\/permission\/getMenu/,'post',permissionApi.getMenu)
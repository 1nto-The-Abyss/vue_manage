import instance from "@/utils/request";

// 请求首页数据
export const getData = () => {
 return instance.get('/home/getData')
}

// 请求用户数据
export const getUserList = (params) => {
  return instance.get('/user/getUserList',params)
 }
 export const createUser = (data) => {
  return instance.post('/user/createUser',data)
 }
 export const deleteUser = (data) => {
  return instance.post('/user/deleteUser',data)
 }
 export const updateUser = (data) => {
  return instance.post('/user/updateUser',data)
 }

// 请求权限目录
export const getMenu = (data) => {
  return instance.post('/permission/getMenu',data)
}
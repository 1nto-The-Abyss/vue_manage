import instance from "@/utils/request";

// 请求首页数据
export const getData = () => {
 return instance.get('/home/getData')
}
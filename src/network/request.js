// 对axios封装出接口，方便更换请求框架，解耦
import axios from "axios";

export function request(config) {
  // 创建对应的axios的对应实例，为了方便请求不同ip地址
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/m5',
    timeout: 5000
  })

  //请求拦截：
  instance.interceptors.request.use(config => {
    return config
  },error => {
    console.log('err');
  })

  //响应拦截
  instance.interceptors.response.use(res => {
    return res.data
  },error => {
    console.log('err');
  })
  //发送真正的网络请求
  return instance(config)
}

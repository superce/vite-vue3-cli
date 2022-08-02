import Axios, { Method, ResponseType, AxiosResponse, AxiosRequestConfig } from 'axios'
import { ElMessage } from 'element-plus'
import router from '@/router/index'
import { getUserId, getToken } from '@/utils/storage'
interface IAxiosData {
  url: string
  method: Method
  headers?: any
  json: boolean
  contentType?: string
  data?: any
  params?: any
  timeout?: number
  responseType?: ResponseType
}
let baseURL = import.meta.env.VITE_APP_API_URL//url
const axios = Axios.create({
  baseURL,
  timeout: 20000
})

// 默认使用 application/json 形式
axios.defaults.headers.post['Content-Type'] = 'application/json'

// 请求拦截器
axios.interceptors.request.use((config: any) => {
  config.headers.token = getToken()
  return config;
},(err) => Promise.reject(err))

// 响应拦截器
axios.interceptors.response.use(
  (res: AxiosResponse) => {
    if(res.config.url === '/Sysuser/CheckLogin' && res.data.StatusCode === 500){
      router.replace('/notallow')
    }
    if(res.data.StatusCode === 517){
      router.replace('/login')
    }
    if (res.data.StatusCode !== 200) ElMessage.error(res.data.Message)
    return res
  },
  (err) => {
    if (err.response && err.response.data) {
      const code = err.response.status
      const msg = err.response.data.Message
      ElMessage.error(`Code: ${code}, Message: ${msg}`)
    } else {
      ElMessage.error(`${err}`)
    }
    return Promise.reject(err)
  }
)

/** *
 * axios({url,method,content,params,datas})
 *
 * @param {string}  url，(必填)
 * @param {string}  method,默认post
//  * @param {boolean} json, content-type类型，(必填)
 * @param {object}  params
 * @param {object}  datas  //token在datas中
 *
 */
export default function request(arr: IAxiosData) {
  return new Promise<any>((resolve, reject) => {
    // arr = requestValidate(arr)
    axios({
      timeout: arr.timeout === undefined ? 20000 : arr.timeout, // 请求超时时间
      url: arr.url,
      method: arr.method || 'POST',
      headers: {
        'content-type': arr.contentType ? arr.contentType : arr.json ? 'application/json; charset=UTF-8;' : 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      params: arr.params || '',
      data: arr.data || '',
      responseType: arr.responseType || 'json'
    }).then(async (response: AxiosResponse<any>) => {
      const responseStatus = `${response.status}`
      // 状态码2开头的处理逻辑
      if (responseStatus.charAt(0) === '2') {
        if (response.data.StatusCode !== 200) {
          reject(response.data)
          return
        }
        resolve(response.data)
      } else {
        reject(response.data)
      }
    }).catch((err) => {
      reject(err)
    })
  })
}

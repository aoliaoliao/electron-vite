import axios from 'axios'
import { AxiosResponse } from 'axios'
import { ElLoading, ElNotification } from 'element-plus'
import { useUserStore } from '@/store/index'

let loading: { close(): void }

// 创建 axios 实例
const request = axios.create({
    // API 请求的默认前缀
    baseURL: '/wp-json',
    timeout: 60000 // 请求超时时间
})

// 异常拦截处理器
const errorHandler = (error: { message: string }) => {
    loading.close()
    console.log(`err${error}`)
    ElNotification({
        title: '请求失败',
        message: error.message,
        type: 'error'
    })
    return Promise.reject(error)
}

// request interceptor
request.interceptors.request.use(config => {
    const userStore = useUserStore()
    loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.4)'
    })
    const token = userStore.getToken()
    // 如果 token 存在
    // 让每个请求携带自定义 token 请根据实际情况自行修改
    if (token && config.headers) {
        config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
}, errorHandler)

// response interceptor
request.interceptors.response.use((response: AxiosResponse<Response>) => {
    loading.close()

    const { data } = response as any
    if (data.statusCode === 200) {
        return data
    } else if (data.statusCode === 401) {
        return data
    } else {
        return data
    }
}, errorHandler)

export default request
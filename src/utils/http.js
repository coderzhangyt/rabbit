import axios from 'axios'
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import router from '@/router'

const httpInstance = axios.create({
    baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
    timeout: 5000
})

// axios请求拦截器
httpInstance.interceptors.request.use(config => {
    // 1. 从pinia获取token数据
    const UserStore = useUserStore()
    const token = UserStore.userInfo.token
    // 2. 按照后端的要求，拼接token数据
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
}, e => Promise.reject(e))

// axios响应式拦截器
httpInstance.interceptors.response.use(res => res.data, e => {
    const UserStore = useUserStore()

    //统一错误处理
    ElMessage({
        type: 'warning',
        message: e.response.data.message
    })

    //当用户token失效时,401处理
    if (e.response.status === 401) {
        //1. 清除用户信息
        UserStore.clearUserInfo()
        //2. 跳转到登录页
        router.push('/login')
    }

    return Promise.reject(e)
})

export default httpInstance
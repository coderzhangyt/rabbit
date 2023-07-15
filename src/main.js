
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'

//引入初始化的样式文件
import '@/styles/common.scss'


import { directivePlugin } from '@/directives'

import { componentPlugin } from '@/components/index'

const app = createApp(App)
const pinia = createPinia()

//注册持久化插件
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)
app.use(directivePlugin)
app.use(componentPlugin)

app.mount('#app')

//定义全局指令


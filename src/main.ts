import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './samples/node-api'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './style/global.scss'

// import api from '@/api'

const app = createApp(App)
const pinia = createPinia()

// app.config.globalProperties.$api = api
app.use(pinia)
app.use(ElementPlus)
app.mount('#app')

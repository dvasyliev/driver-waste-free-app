import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import { store } from './store'
import 'material-icons/iconfont/material-icons.css'
import './main.css'

createApp(App).use(router).use(store).mount('#app')

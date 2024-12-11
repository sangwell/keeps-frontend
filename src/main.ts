import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Antd from 'ant-design-vue';

import App from './App.vue'
import router from './router'
import moment from "moment";

const app = createApp(App)

// 定义一个全局方法用于格式化日期
app.config.globalProperties.$formatDate = (value, format = 'YYYY-MM-DD') => {
  if (!value) return '';
  return moment(value).format(format);
};

app.use(createPinia())
app.use(router)

app.use(Antd).mount('#app')

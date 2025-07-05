import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router/index.js'
import store from '@/store/index.js'
import ElementUI from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
Vue.use(ElementUI)
// 全局变量
Vue.prototype.$global = {
    'tableHeight': 600
}

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
})

// import Vue from 'vue'
import App from './App.vue'
import router from './router'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import echarts from 'echarts'
Vue.prototype.$echarts = echarts

import Video from 'video.js'
import 'video.js/dist/video-js.css'
Vue.prototype.$video = Video

Vue.prototype.$ELEMENT = {
    size: 'small',
    zIndex: 3000
};
Vue.use(ElementUI);


// import axios from "axios";

import Vant from 'vant';
import {
    Notify
} from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);
Vue.use(Notify);


import instance_ from '../config/index';
import VueWechatTitle from 'vue-wechat-title'
Vue.use(VueWechatTitle)




Vue.prototype.instance = instance_ //axios实例


Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
// import axios from 'axios';

// var $api;
// // 正式环境
// // var url = process.env.NODE_ENV == 'development' ? '' : 'https://silencerapitest.speech.sogou.com/';
// // 本地环境
// const url = process.env.NODE_ENV == 'development' ? '../src/mock/' : 'https://nlutest.speech.sogou.com/';


// // console.log(process.env.NODE_ENV);
// console.log('2020-06-20-15-15');

// if (process.env.NODE_ENV == 'development') {
//     $api = axios.create({
//         baseURL: url, // api的base_url
//         timeout: 5000,
//         headers: {
//             'Content-Type': "application/json;charset=utf-8"
//         }
//     });
// } else {
//     $api = axios.create({
//         baseURL: url, // api的base_url
//         timeout: 5000,
//         headers: {
//             'Content-Type': "application/json;charset=utf-8"
//         }
//     });
// }


// $api.interceptors.request.use(config => {
//     return config
// }, error => {
//     console.log('请求超时');
//     Promise.reject(error)
// })

// $api.interceptors.response.use(response => {
//     console.log(response)
//     //接收到响应数据并成功后的一些共有的处理，关闭loading等
//     return response
// }, error => {
//     console.log('请联网后再操作')
//     return Promise.resolve(error.response)
// })

// export default {
//     post(url, data) {
//         if (process.env.NODE_ENV == 'development') {
//             return $api.post(url + '.json', data);
//         } else {
//             return $api.post(url, data);
//         }

//     },
//     get(url, data) {
//         if (process.env.NODE_ENV == 'development') {
//             return $api.get(url + '.json', data)
//         } else {
//             return $api.get(url, data)
//         }
//     },
// };

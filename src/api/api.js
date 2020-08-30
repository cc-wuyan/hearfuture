import http from '../utils/http';
let isOnline = process.env.VUE_APP_ENV == "dev" ? false : true;
// get请求
export default {
    getListAPI(url, params) {
        if (isOnline) {
            return http.get(url + '.json', params)
        } else {
            if (!params.sid) {
                params.sid = localStorage.getItem('sid');
            }
            return http.get(url, params)
        }
    },
    postFormAPI(url, params) {
        if (isOnline) {
            return http.get(url + '.json', params)
        } else {
            if (!params.sid) {
                params.sid = localStorage.getItem('sid');
            }
            return http.post(url, params)
        }

    },
}
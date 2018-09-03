import axios from 'axios'
const defaultImg = require('../assets/img/default_img.png')

const _request = function(options){
  if(!options) return
  let opt = {
    headers: {
      Accept: 'application/json, text/plain, */*',
      Authorization: localStorage["accessToken"]
    }
  }
  Object.assign(opt, options)
  // opt.url = opt.url
  return axios(opt).then(res => res.data).catch( (res) => {
    return null
  })
}

const API = {
  defaultImg,
  GET: (url, data, options) => {
    let opt = options || {
      url, 
      data, 
    }
    opt.method = 'GET'
    return _request(opt)
  },
  POST: (url, data, options) => {
    let opt = options || {
      url, 
      data, 
    }
    opt.method = 'POST'
    opt.headers = {
        Accept: 'application/json, text/plain, */*'
      }
    return _request(opt)
  },
}
export default API

/*import axios from 'axios'
// const d1 = 'http://172.16.1.200:8000/api'

export default function request(url, options) {
  options = options || {};
  if (url) options.url = url;
  if (!options.method) 
    options.method = 'get';
  else 
    options.method = options.method.toLowerCase();

  if (!options.headers)
    options.headers = {
      Accept: 'application/json, text/plain, ',
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: localStorage['accessToken'],
    };
  return axios(options)
    .then(res => {
      // console.table(res.data)
      return res.data;
    })
    .catch(e => {
      e = JSON.parse(JSON.stringify(e));
      // const { dispatch } = store;
      // const status = e.response.status;
      // if (status === 401) {
        // localStorage['accessToken'] = '';
        // dispatch({
        //   type: 'login/logout',
        // });
        // return;
      // }
      // if (status === 403) {
      //   dispatch(routerRedux.push('/exception/403'));
      //   return;
      // }
      // if (status <= 504 && status >= 500) {
      //   dispatch(routerRedux.push('/exception/500'));
      //   return;
      // }
      // if (status >= 404 && status < 422) {
      //   dispatch(routerRedux.push('/exception/404'));
      // }
    });
}*/
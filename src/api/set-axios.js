/*
 * Description:api请求封装
 * Author:詹陈龙
 * Update:2017-05-10
 */
import axios from 'axios';
import Cookies from 'js-cookie';
import {url} from '../config/index';

export default function setAxios() {
  /* eslint-disable */

  //axios.defaults.baseURL = 'http://192.168.0.211:8001/mymengya';
  //测试验证
  //axios.defaults.headers.common['X-Token'] = 'mymengya123456';

  //axios.defaults.baseURL = 'http://api.mymengya.com/mengyatest';

  axios.defaults.baseURL = url;
  console.log("=========setAxios==============");
  console.log("-"+url+"-");
  axios.defaults.headers.common['X-Token'] = Cookies.get('token');

  return function fetch(url, method, cb, errcb, params) {
    if (method === 'get') {
      axios.get(url, {
          params,
        })
        .then((res) => {
          /* eslint-disable keyword-spacing */
          /* eslint-disable no-undef */
          cb(res);
          // if(res.data.state === 0) {
          //   Cookies.remove('token');
          //   const newState = res.data.weixinUrl.replace(/&state=\w+#/g, `&state=http://${window.location.host}/authorization?next=${window.location.pathname}#`);
          //   window.location.href = newState;
          // } else {
          //   cb(res);
          // }
          /* eslint-disable no-undef */
          /* eslint-disable keyword-spacing */
        })
        .catch((err) => {

          errcb(err);
        });
    } else {
      axios.post(url, params)
        .then((res) => {
          /* eslint-disable keyword-spacing */
          /* eslint-disable no-undef */
          if (res.data.state === 0) {
            window.location.href = res.data.weixinUrl;
          } else {
            cb(res);
          }
          /* eslint-disable no-undef */
          /* eslint-disable keyword-spacing */
        })
        .catch((err) => {

          errcb(err);
        });
    }
  };
  /* eslint-disable */
}

/*
* Description:demo api请求页
* Author:詹陈龙
* Update:2018-08-03
*/
import setting from './set-axios';
const fetch = setting();

export default {
  getUserList: fetch.bind(this, '/user/list', 'get'),
  //获取用户列表
};

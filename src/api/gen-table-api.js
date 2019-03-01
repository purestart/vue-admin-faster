/*
* Description:demo api请求页
* Author:詹陈龙
* Update:2018-08-03
*/
import setting from './set-axios';
const fetch = setting();

export default {
  getGenTableList: fetch.bind(this, '/get-gen-table-list', 'get'),
  //获取数据库列表
  deleteGenTableById: fetch.bind(this, '/delete-gen-table', 'get'),
  //获取数据库列表
  createGenTable:fetch.bind(this,'/create-gen-table','post'),
  updateGenTable:fetch.bind(this,'/update-gen-table','post'),
  generateCode:fetch.bind(this,"/generator-code","post"),
};

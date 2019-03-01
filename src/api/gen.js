/*
* Description:demo api请求页
* Author:詹陈龙
* Update:2018-08-03
*/
import setting from './set-axios';
const fetch = setting();

export default {
  getDbList: fetch.bind(this, '/get-dbs-list', 'get'),
  //获取数据库列表
  deleteDbById: fetch.bind(this, '/delete-dbs', 'get'),
  //获取数据库列表
  createDb:fetch.bind(this,'/create-dbs','post'),
  updateDb:fetch.bind(this,'/update-dbs','post'),

  //数据库同步
  syncDb:fetch.bind(this,'/api/sys/sync-db','post'),
  showTables:fetch.bind(this,'/api/sys/show-tables','get'),
  createGenByTable:fetch.bind(this,'/api/sys/create-gen-by-table','post'),
};

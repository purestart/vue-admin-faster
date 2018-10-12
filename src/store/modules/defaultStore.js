/**
 * Created by tanyichao on 2017/3/17.
 */
import userApi from '../../api/demo'

const state = {
    msg: "vuex data",
  header: '',
  Theme: {
    header: true,
    yellowheader: true,
    blueheader: false,
  },
  menus:
      [
        {
          id:1,
          url:"/home",
          name:"首页",
          icon:"fa fa-home",
          childrens:[]
        },

        {
          id:2,
          url:"",
          name:"项目管理",
          icon:"el-icon-location",
          childrens:[
              {
              id:21,
              url:"/home",
              name:"项目信息管理",
              icon:"",
              childrens:[]
            },
            {
              id:22,
              url:"/home",
              name:"项目物料管理",
              icon:"",
              childrens:[]
            },
            {
              id:23,
              url:"/home",
              name:"项目物料库存管理",
              icon:"",
              childrens:[]
            },
          ]
        },
         {
          id:3,
          url:"",
          name:"权限管理",
          icon:"el-icon-menu",
          childrens:[
                {
                  id:31,
                  url:"/menus",
                  name:"菜单管理",
                  icon:"fa fa-home",
                  childrens:[]
              },
                  {
                  id:32,
                  url:"/roles",
                  name:"角色管理",
                  icon:"fa fa-home",
                  childrens:[]
              },
              {
                id:33,
                url:"/office",
                name:"部门管理",
                icon:"fa fa-home",
                childrens:[]
            },
              {
                id:34,
                url:"/menus",
                name:"用户管理",
                icon:"fa fa-home",
                childrens:[
                         {
                        id:6,
                        url:"/page1",
                        name:"基础用户",
                        icon:"fa fa-home",
                        childrens:[]
                      },
                       {
                        id:7,
                        url:"/page2",
                        name:"其他用户",
                        icon:"fa fa-home",
                        childrens:[]
                      },
                ]
              }
          ]
        },
        {
          id:8,
          url:"/roles",
          name:"页面管理",
          icon:"fa fa-home",
          childrens:[
            {
              id:81,
              url:"/list1",
              name:"列表页一",
              icon:"fa fa-home",
              childrens:[]
            },
            {
              id:82,
              url:"/list2",
              name:"列表页二",
              icon:"fa fa-home",
              childrens:[]
            },
            {
              id:83,
              url:"/list3",
              name:"列表页三",
              icon:"fa fa-home",
              childrens:[]
            },
            {
              id:84,
              url:"/form1",
              name:"综合表单",
              icon:"fa fa-home",
              childrens:[]
            },
          ]
      },{
        id:9,
        url:"/roles",
        name:"系统管理",
        icon:"fa fa-home",
        childrens:[
          {
            id:91,
            url:"/list1",
            name:"日志管理",
            icon:"fa fa-home",
            childrens:[]
          },
          {
            id:92,
            url:"/list2",
            name:"字典管理",
            icon:"fa fa-home",
            childrens:[]
          },
        ]
        },

      ],
    selectedMenu: {},
    mainMenu: [],
    editData:{},
    tableData: [
      {
      id:1,
      date: '2016-05-03',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: 200333
    }, {
      id:2,
      date: '2016-05-02',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: 200333
    }, {
      id:3,
      date: '2016-05-04',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: 200333
    }, {
      id:4,
      date: '2016-05-01',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: 200333
    }, {
      id:5,
      date: '2016-05-08',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: 200333
    }, {
      id:6,
      date: '2016-05-06',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: 200333
    }, {
      id:7,
      date: '2016-05-07',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: 200333
    },{
      id:8,
      date: '2016-05-07',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: 200333
    },{
      id:9,
      date: '2016-05-07',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: 200333
    },{
      id:10,
      date: '2016-05-07',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: 200333
    },{
      id:10,
      date: '2016-05-07',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: 200333
    },{
      id:10,
      date: '2016-05-07',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: 200333
    },{
      id:10,
      date: '2016-05-07',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: 200333
    },{
      id:10,
      date: '2016-05-07',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: '上海市普陀区金沙江路 1518 弄',
      zip: 200333
    }],
}
const mutations = {
  updateMsg(state, payload) {
    state.msg = payload;
  },
  loadHeader(state, payload) {
    if (payload) {
      state.header = payload;
      window.sessionStorage.setItem('header', payload)
    } else {
      state.header = '菜单管理'
      if (window.sessionStorage.getItem('header')) {
        state.header = window.sessionStorage.getItem('header')
      }
    }
  },
  theme(state, payload) {
    state.Theme.yellowheader = !state.Theme.yellowheader
    state.Theme.blueheader = !state.Theme.blueheader
    window.localStorage.setItem('Theme', JSON.stringify(state.Theme))
  },
  detheme(state, payload) {
    let tmpTheme = JSON.parse(window.localStorage.getItem('Theme'));
    if (tmpTheme) {
      state.Theme = JSON.parse(window.localStorage.getItem('Theme'))
    }
  },
  EditSelect(state, payload) {
    console.log(payload)
    state.editData = payload
  }
}
const actions = {
    fetchCourse({commit, dispatch}, payload = {noShare: false}) {
        //api 请求
        console.log(userApi)
        userApi.getUserList((res) => {
            console.log("success");
            console.log(res);
    
          //commit('updateMsg', "res.data");
    
        }, err => {}, {})
    
        console.log("fetch course");
    
        //提交数据到mutation
    
        // dispatch action
        // dispatch('playAudio', initSecIndex);
    
      },
  ThemeChange({commit, dispatch}, payload = {noShare: false}){
    commit("theme")
  },
  deftheme({commit, dispatch}, payload){
    commit("detheme",payload)
  },
  LoadHeader({commit, dispatch}, payload){
    commit("loadHeader",payload)
  },
  DataEdit({commit, dispatch}, payload){
    commit("EditSelect",payload)
  },
}

export default {
  state,
  actions,
  mutations
}

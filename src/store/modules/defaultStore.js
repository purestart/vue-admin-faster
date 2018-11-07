/**
 * Created by tanyichao on 2017/3/17.
 */
import userApi from '../../api/demo'

const state = {
  msg: "vuex data",
  header: '',
  permissions:["sys:user:delete","sys:user:export"],
  Theme: {
    header: true,
    yellowheader: true,
    blueheader: false,
  },
  Theme1:{
    yellowTheme:{
      baseColor:"rgba(255,209,73,1)",//主题基础色
      className:"yellowTheme",
      name:"黄色主题",
      navBgColor:"#ffffff",//菜单背景颜色
      navTextColor:"#222222",//菜单字体颜色
      navActiveTextColor:"#ED8113",//菜单选中字体颜色
      headerFontColor:"#3C3C3C",
    },
    blueTheme:{
      name:"深蓝色主题",
      baseColor:"#23336f",//主题基础色
      className:"blueTheme",
      
      navBgColor:"#23336f",//菜单背景颜色
      navTextColor:"#fff",//菜单字体颜色
      navActiveTextColor:"#1e90ff",//菜单选中字体颜色
      headerFontColor:"#ffffff",
    },
    orangeTheme:{
      name:"橘黄色主题",
      baseColor:"rgba(240, 133, 25, 1)",//主题基础色
      className:"orangeTheme",
      headerFontColor:"#ffffff",
      navBgColor:"#ffffff",//菜单背景颜色
      navTextColor:"#222222",//菜单字体颜色
      navActiveTextColor:"rgba(240, 133, 25, 1)",//菜单选中字体颜色
    },
    currentTheme:{
      name:"橘黄色主题",
      baseColor:"rgba(240, 133, 25, 1)",//主题基础色
      className:"orangeTheme",
      headerFontColor:"#ffffff",
      navBgColor:"#ffffff",//菜单背景颜色
      navTextColor:"#222222",//菜单字体颜色
      navActiveTextColor:"rgba(240, 133, 25, 1)",//菜单选中字体颜色
    },
  },
  menus:
      [
        {
          id:1,
          url:"/home",
          name:"首页",
          icon:"iconfont icon-dashboard",
          childrens:[]
        },
        {
          id:2,
          url:"",
          name:"项目管理",
          icon:"iconfont icon-location-fill",
          childrens:[
            {
              id:24,
              url:"/enter-page",
              name:"业务启动流程管理",
              icon:"",
              childrens:[]
            },
              {
              id:21,
              url:"/project-info",
              name:"项目信息管理",
              icon:"",
              childrens:[]
            },
            {
              id:22,
              url:"/pre-project",
              name:"项目物料管理",
              icon:"",
              childrens:[]
            },
            {
              id:23,
              url:"/pro-room",
              name:"项目物料库存管理",
              icon:"",
              childrens:[]
            },
          ]
        },
        {
          id:11,
          url:"",
          name:"报表管理",
          icon:"iconfont icon-location-fill",
          childrens:[
              {
              id:111,
              url:"/custom-chart",
              name:"客户业务报表",
              icon:"",
              childrens:[]
            },
            {
              id:112,
              url:"/pre-project",
              name:"项目物料管理",
              icon:"",
              childrens:[]
            },
            {
              id:113,
              url:"/pro-room",
              name:"项目物料库存管理",
              icon:"",
              childrens:[]
            },
          ]
        },
        
        {
          id:5,
          url:"",
          name:"代码生成",
          icon:"iconfont icon-fa-codepen",
          childrens:[
            {
              id:54,
              url:"/databases",
              name:"数据库管理",
              icon:"",
              childrens:[]
            },
            {
              id:55,
              url:"/module",
              name:"模板管理",
              icon:"",
              childrens:[]
            },
              {
              id:51,
              url:"/gen-list",
              name:"数据表单配置",
              icon:"",
              childrens:[]
            },
            {
              id:53,
              url:"/form-gen",
              name:"表单生成器",
              icon:"",
              childrens:[]
            },
            {
              id:52,
              url:"/pro-material",
              name:"生成示例",
              icon:"",
              childrens:[]
            },
          ]
        },
        {
          id:4,
          url:"",
          name:"我的应用",
          icon:"el-icon-menu",
          childrens:[
              {
              id:41,
              url:"/profile",
              name:"个人信息",
              icon:"",
              childrens:[]
            },
            {
              id:42,
              url:"/pre",
              name:"文件管理",
              icon:"",
              childrens:[]
            },
            {
              id:43,
              url:"/pro-room",
              name:"我的日程",
              icon:"",
              childrens:[]
            },
            {
              id:44,
              url:"/pro-room",
              name:"通讯录",
              icon:"",
              childrens:[]
            },
            {
              id:45,
              url:"/pro-room",
              name:"信箱",
              icon:"",
              childrens:[]
            },
            {
              id:46,
              url:"/pro-room",
              name:"我的好友",
              icon:"",
              childrens:[]
            },
          ]
        },
         {
          id:3,
          url:"",
          name:"权限管理",
          icon:"iconfont icon-security",
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
                url:"/groups",
                name:"部门管理",
                icon:"fa fa-home",
                childrens:[]
            },
              {
                id:34,
                url:"/users",
                name:"人员管理",
                icon:"fa fa-home",
                childrens:[]
              }
          ]
        },
        {
          id:8,
          url:"/roles",
          name:"页面管理",
          icon:"iconfont icon-fa-columns",
          childrens:[
            {
              id:81,
              url:"/list1",
              name:"列表页",
              icon:"fa fa-home",
              childrens:[]
            },
            {
              id:82,
              url:"/list2",
              name:"tab页面",
              icon:"fa fa-home",
              childrens:[]
            },
            {
              id:83,
              url:"/list3",
              name:"综合报表",
              icon:"fa fa-home",
              childrens:[]
            },
            {
              id:84,
              url:"/form",
              name:"综合表单",
              icon:"fa fa-home",
              childrens:[]
            },
          ]
      },{
        id:9,
        url:"/roles",
        name:"系统管理",
        icon:"iconfont icon-Afa-cog",
        childrens:[
          {
            id:92,
            url:"/list2",
            name:"字典管理",
            icon:"fa fa-home",
            childrens:[]
          },
          {
            id:93,
            url:"/list2",
            name:"系统配置",
            icon:"fa fa-home",
            childrens:[]
          },
        ]
        },{
          id:10,
          url:"/moniter",
          name:"系统监控",
          icon:"iconfont icon-fa-video-camera",
          childrens:[
            {
              id:101,
              url:"/log",
              name:"日志查询",
              icon:"fa fa-home",
              childrens:[]
            },
            {
              id:102,
              url:"/druid",
              name:"连接池监视",
              icon:"fa fa-home",
              childrens:[]
            },
            {
              id:103,
              url:"/druid",
              name:"系统监控管理",
              icon:"fa fa-home",
              childrens:[]
            },
          ]
          },

      ],
    selectedMenu: {},
    mainMenu: [],
    editData:{},
    tableData: [],
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

    if(state.Theme1.currentTheme.className=='orangeTheme'){
      state.Theme1.currentTheme=state.Theme1.blueTheme;
    }else{
      state.Theme1.currentTheme=state.Theme1.orangeTheme;
    }
    
    
    window.localStorage.setItem('Theme1', JSON.stringify(state.Theme1))
  },
  detheme(state, payload) {
   // let tmpTheme = JSON.parse(window.localStorage.getItem('Theme'));
    let tmpTheme1 = JSON.parse(window.localStorage.getItem('Theme1'));
    if (tmpTheme1) {
      //state.Theme1 = JSON.parse(window.localStorage.getItem('Theme1'))
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

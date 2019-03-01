/**
 * Created by tanyichao on 2017/3/17.
 */
import userApi from '../../api/demo'

const state = {
  msg: "vuex data",
  permissions:["sys:user:delete","sys:user:export"],
  Theme:{
    yellowTheme:{
      baseColor:"rgba(255,209,73,1)",//主题基础色
      className:"yellowTheme",
      name:"黄色主题",
      navBgColor:"#ffffff",//菜单背景颜色
      navTextColor:"#222222",//菜单字体颜色
      navActiveTextColor:"#ED8113",//菜单选中字体颜色
      headerFontColor:"#3C3C3C",
      bacgroundImage:null,
    },
    grayTheme:{
      name:"灰色主题",
      baseColor:"rgba(0,0,0,0.4)",//主题基础色
      className:"grayTheme",
      navBgColor:"rgba(0,0,0,0.4)",//菜单背景颜色
      navTextColor:"#fff",//菜单字体颜色
      navActiveTextColor:"#1e90ff",//菜单选中字体颜色
      headerFontColor:"#ffffff",
      bacgroundImage:"/static/images/bg1.jpg",
    },
    blueTheme:{
      name:"深蓝色主题",
      baseColor:"#23336f",//主题基础色
      className:"blueTheme",
      
      navBgColor:"#23336f",//菜单背景颜色
      navTextColor:"#fff",//菜单字体颜色
      navActiveTextColor:"#1e90ff",//菜单选中字体颜色
      headerFontColor:"#ffffff",
      bacgroundImage:null,
    },
    orangeTheme:{
      name:"橘黄色主题",
      baseColor:"rgba(240, 133, 25, 1)",//主题基础色
      className:"orangeTheme",
      headerFontColor:"#ffffff",
      navBgColor:"#ffffff",//菜单背景颜色
      navTextColor:"#222222",//菜单字体颜色
      navActiveTextColor:"rgba(240, 133, 25, 1)",//菜单选中字体颜色
      bacgroundImage:null,
    },
    currentTheme:{
      name:"橘黄色主题",
      baseColor:"rgba(240, 133, 25, 1)",//主题基础色
      className:"orangeTheme",
      headerFontColor:"#ffffff",
      navBgColor:"#ffffff",//菜单背景颜色
      navTextColor:"#222222",//菜单字体颜色
      navActiveTextColor:"rgba(240, 133, 25, 1)",//菜单选中字体颜色
      bacgroundImage:null,
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
              id:25,
              url:"/project-ctrl",
              name:"项目总控表",
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
              url:"/gen-template",
              name:"模板管理",
              icon:"",
              childrens:[]
            },
            {
              id:56,
              url:"/gen-type",
              name:"类型管理",
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
            // {
            //   id:53,
            //   url:"/form-gen",
            //   name:"表单生成器",
            //   icon:"",
            //   childrens:[]
            // },
            {
              id:52,
              url:"/pro-material",
              name:"生成示例",
              icon:"",
              childrens:[]
            },
          ]
        },
        // {
        //   id:4,
        //   url:"",
        //   name:"我的应用",
        //   icon:"el-icon-menu",
        //   childrens:[
        //       {
        //       id:41,
        //       url:"/profile",
        //       name:"个人信息",
        //       icon:"",
        //       childrens:[]
        //     },
        //   ]
        // },
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
                  url:"/role",
                  name:"角色管理",
                  icon:"fa fa-home",
                  childrens:[]
              },
              {
                id:33,
                url:"/dept",
                name:"部门管理",
                icon:"fa fa-home",
                childrens:[]
            },
              {
                id:34,
                url:"/user",
                name:"人员管理",
                icon:"fa fa-home",
                childrens:[]
              }
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
          }
        ]
        }
      ],
    selectedMenu: {},
    mainMenu: [],
}
const mutations = {
  updateMsg(state, payload) {
    state.msg = payload;
  },
  changeTheme(state, payload) {
    console.log("payload");
    console.log(payload);

    // if(state.Theme.currentTheme.className=='orangeTheme'){
    //   state.Theme.currentTheme=state.Theme.blueTheme;
    // }else{
    //   state.Theme.currentTheme=state.Theme.orangeTheme;
    // }
    state.Theme.currentTheme=payload;
    window.localStorage.setItem('Theme', JSON.stringify(state.Theme))
  },
  detheme(state, payload) {
   // let tmpTheme = JSON.parse(window.localStorage.getItem('Theme'));
    let tmpTheme = JSON.parse(window.localStorage.getItem('Theme'));
    if (tmpTheme) {
      state.Theme = JSON.parse(window.localStorage.getItem('Theme'))
    }
  },

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
  changeTheme({commit, dispatch}, payload){
    commit("changeTheme",payload)
  },
  deftheme({commit, dispatch}, payload){
    commit("detheme",payload)
  },

}

export default {
  state,
  actions,
  mutations
}
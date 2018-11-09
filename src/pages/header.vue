<template>
    <div :class="Theme1.currentTheme.className" class="header-container">
       <div class="logo">
         <img src="../assets/logo.png">
       </div>
        <div class="h_nav">
            <ul class="list">
              <li class="active">首页</li>
              <el-popover
              placement="bottom"
              width="300"
              trigger="hover">
                <div style="display:flex">
                  <div @click="toPage('eng-chart')" style="cursor: pointer;flex:1;text-align:center;padding:10px;5px;background-color:#f2f2f2;margin:5px;">
                    工程线
                  </div>
                   <div @click="toPage('dealer-chart')" style="cursor: pointer;flex:1;text-align:center;padding:10px;5px;background-color:#f2f2f2;margin:5px;">
                    经销商
                  </div>
                  <div @click="toPage('work-team')" style="cursor: pointer;flex:1;text-align:center;padding:10px;5px;background-color:#f2f2f2;margin:5px;">
                    施工队
                  </div>
                </div>
                <li slot="reference">驾驶舱</li>
              </el-popover>
              <el-dropdown
                trigger="hover"
                @command="changeSys()"
              >
              <li >更多系统</li>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="安全设置">客服系统</el-dropdown-item>
                <el-dropdown-item command="changetheme">呼叫中心系统</el-dropdown-item>
               
              </el-dropdown-menu>
            </el-dropdown>

            </ul>
          <div class="h_user">
            <div class="gap"></div>

          <el-popover
            placement="bottom-end"
            trigger="hover"
            width="200"
            v-model="schedulePopver">
            <p>您有0条未读消息 <a href="javascript:void(0)">查看所有></a></p>
            <a slot="reference" href="javascript:void(0)">
              <el-badge :value="10" :max="99" class="bell-item">
                <span class="bell-text">待办</span>
              </el-badge>
            </a>
          </el-popover>

          <el-popover
            placement="bottom-end"
            trigger="hover"
            width="200"
            v-model="msgPopver">
            <p>您有0条未读消息 <a href="javascript:void(0)">查看所有></a></p>
            <a slot="reference" href="javascript:void(0)">
              <el-badge :value="2" :max="99" class="bell-item">
                <span class="bell-text">消息</span>
              </el-badge>
            </a>
          </el-popover>

          <el-popover
            placement="bottom-end"
            trigger="hover"
            width="200"
            v-model="noticePopver">
            <p>您有0条未读消息 <a href="javascript:void(0)">查看所有></a></p>
            <a slot="reference" href="javascript:void(0)">
              <el-badge :value="3" :max="99" class="bell-item">
                <span class="bell-text">通知公告</span>
              </el-badge>
            </a>
          </el-popover>

          <div class="gap"></div>
          <div class="login-user"> 
            <img src="../assets/images/head.jpg" alt="">
            <span class="username">张三</span>
          </div>

            <el-dropdown
              trigger="hover"
             
              @command="selectSelf"
            >
              <span  class="el-dropdown-link" :style="{color:Theme1.currentTheme.headerFontColor}">
                <i class="el-icon-setting el-icon--left" ></i>设置
                <!-- <i class="el-icon-arrow-down el-icon--right" ></i> -->
              </span>
              
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="桌面配置">桌面配置</el-dropdown-item>
                  <!-- <el-popover
                placement="left"
                width="100"
                trigger="hover">
              <div>啦啦啦</div> -->
                <dropdown-item @mouseover="showThemeBox=true" @mouseout="showThemeBox=false" class="setting-theme-dropdown" style="position:relative" command="changetheme">
                  切换主题
                  <div v-if="showThemeBox" class="theme-menu-box" >
                    <div @click="changeTheme('default')" class="theme-box"></div>
                    <div @click="changeTheme('red-theme')" class="theme-box red-theme"></div>
                    <div @click="changeTheme('gray-theme')" class="theme-box gray-theme"></div>
                  </div>
                </dropdown-item>
                 <!-- </el-popover> -->
                <el-dropdown-item divided command="3">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>

            <!-- <el-menu mode="horizontal">
              <el-submenu index="2">
                <template slot="title">我的工作台</template>
                <el-menu-item index="2-1">选项1</el-menu-item>
                <el-menu-item index="2-2">选项2</el-menu-item>
                <el-menu-item index="2-3">选项3</el-menu-item>
              </el-submenu>
            </el-menu> -->

          </div>
        </div>

      <edit-model :width="1200" :height="700" @submit="sumitForm()" title="桌面配置" :modelVisible="modelVisible" @close="modelVisible=false">
        <div class="config-contaniner">
          <div class="menu-config">
            <div class="title-box">系统主要功能列表</div>
            <div class="config-box">
                <el-tree
                
                :data="menusData"
                show-checkbox
                node-key="id"
                :default-expanded-keys="[2, 3]"
                :default-checked-keys="[5]"
                :props="defaultProps">
                </el-tree>
            </div>
          </div>
          <div class="dashboard-config">
            <div class="buttom-box">
              <el-button @click="selectVisible=true" size="mini" type="primary">新增模块</el-button>
            </div>
            <div class="config-box">
                <grid-layout
                  v-if="userDashboard.length"
                      :layout="userDashboard"
                      :col-num="colNum"
                      :row-height="rowHight"
                      :is-draggable="true"
                      :is-resizable="true"
                      :is-mirrored="false"
                      :vertical-compact="true"
                      :use-css-transforms="true"
                      @layout-updated="onLayoutUpdated"
                  >
                  <grid-item v-for="item in userDashboard"
                            :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i" :key="item.id"
                            dragIgnoreFrom=".ignore">
                    <div class="module-wraper">
                      {{item.dashboard.name}}
                    </div>
                  </grid-item>
                </grid-layout>
            </div>
          </div>
        </div>
      </edit-model>
      <edit-model @submit="getSelectValue()" title="桌面配置" :modelVisible="selectVisible" @close="selectVisible=false">
          <DashboardSelector @selected="onSelected" ref="DashboardSelector" :value="selected">
          </DashboardSelector>
      </edit-model>
    </div>
</template>

<script>
//import "./header.scss";

import { mapActions, mapState } from "vuex";
import DashboardSelector from "./dashboard/fragment/DashboardSelector.vue";
import DropdownItem from '../components/drop-down/dropdown-item.vue';
export default {
  components: {
    DashboardSelector,
    DropdownItem
  },
  data() {
    return {
      msgPopver: false,
      showThemeBox:false,
      schedulePopver: false,
      noticePopver: false,
      activeName: "second",
      color1: "#ffffff",
      color2: "#ffffff",
      modelVisible: false,
      selectVisible: false,
      userDashboard: [],
      userDashboardClone: [],
      rowHight: 30,
      colNum: 8,
      menusData: [
        {
          id: 1,
          label: "项目管理",
          children: [
            {
              id: 4,
              label: "项目进度管理",
              children: [
                {
                  id: 9,
                  label: "项目资料"
                },
                {
                  id: 10,
                  label: "三级 1-1-2"
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: "报表管理",
          children: [
            {
              id: 5,
              label: "综合报表"
            },
            {
              id: 6,
              label: "二级 2-2"
            }
          ]
        },
        {
          id: 3,
          label: "我的应用",
          children: [
            {
              id: 7,
              label: "菜单管理"
            },
            {
              id: 8,
              label: "二级 3-2"
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  computed: {
    ...mapState({
      msg: state => state.default.msg,
      // Theme: state => state.default.Theme,
      Theme1: state => state.default.Theme1
    }),
    selected() {
      return this.userDashboard.map(
        userDashboard => userDashboard.dashboard.id
      );
    }
  },
  created() {
    this.initData();
  },
  mounted() {},
  methods: {
    ...mapActions(["fetchCourse", "ThemeChange", "LoadHeader"]),
    initData() {
      let { data } = require("./dashboard/userDashBoard.json");
      console.log(data);
      if (data[0].dashboard) {
        this.userDashboard = data;
      }
    },
    getSelectValue() {
      this.$refs.DashboardSelector.onSelected();
      this.selectVisible = false;
    },
    onLayoutUpdated() {},
    sumitForm() {},
    save() {
      const list = [];
      this.userDashboard.forEach(userDashboard => {
        const clone = { ...userDashboard };
        clone.dashboardId = userDashboard.dashboard.id;
        list.push(clone);
      });

      // const {data} = await this.saveUserDashboard(list)
      const data = { success: true };
      if (data) {
        //this.$utils.message('保存成功！')

        this.userDashboardClone = JSON.parse(
          JSON.stringify(this.userDashboard)
        );
        this.layoutUpdated = false;
      }
    },
    toPage(name) {
      this.$router.push({ name: name });
    },
    onSelected(dashboards) {
      this.dashboard2UserDashboard(dashboards);
      this.save();
      //this.$utils.hideDialog()
    },
    dashboard2UserDashboard(dashboard) {
      this.userDashboard = [];
      // 用户没有配置dashboard，后端返回默认的几个dashboard，需要转成userDashboard
      let startX = 0;
      let startY = 0;
      dashboard.forEach((dashboard, index) => {
        // 先根据类型定义宽和高
        let w = 2;
        let h = 3;
        if (dashboard.type !== "info") {
          w = 4;
          h = 8;
        }
        // 计算位置
        const { x, y } = this.getLocation(startX, startY, w, h);
        this.userDashboard.push({ x, y, w, h, i: index + "", dashboard });
        startX = x + w;
        startY = y;
      });
    },
    // 计算仪表盘的摆放位置的算法：从坐标为0，0的地方开始摆放第一个dashboard，后面的就从紧挨着前一个的位置开始，
    // 以需要摆放的dashboard的宽高构建一个矩形区域，然后判断已经有dashboard和这个区域重叠，如果没有，就可以摆放
    // 如果重叠，那么这个区域往后移动一个坐标，再次判断，直到区域可用
    // 移动的方式是，先沿着x轴移动，x轴不能移动后（x+宽度>总宽度），再往y轴移动
    getLocation(startX, startY, w, h) {
      const userDashboard = this.userDashboard;
      if (userDashboard.length) {
        // 看x轴方向是否能往后移动
        if (startX + w > this.colNum) {
          startY++;
          startX = 0;
        }
        // 判断是否有dashboard和目标位置相交（中心点X的相对距离<宽度和的一半 && 中心点Y点距离<高度和的一半）
        const center = {
          x: startX + w / 2,
          y: startY + h / 2
        };
        const dashboard = userDashboard.find(ud => {
          const centerTemp = {
            x: ud.x + ud.w / 2,
            y: ud.y + ud.h / 2
          };
          const xl = Math.abs(center.x - centerTemp.x);
          const yl = Math.abs(center.y - centerTemp.y);
          return xl < (w + ud.w) / 2 && yl < (h + ud.h) / 2;
        });
        if (dashboard) {
          // 移动一格
          startX++;
          return this.getLocation(startX, startY, w, h);
        }
      }
      return { x: startX, y: startY };
    },
    changeTheme(a) {
      console.log(a);
      this.ThemeChange();
      // switch (a) {
      //   case "1":
      //     break;
      //   case "2":
      //     break;
      //   case "changetheme":
      //    // this.ThemeChange();
      //     break;
      // }
    },
    selectSelf(a) {
      switch (a) {
        case "桌面配置":
          this.modelVisible = true;
          break;
        case "3":
          this.logout();
          break;
        case "changetheme":
          //this.ThemeChange();
          break;
      }
    },
    changeSys() {
      //更换系统
    },
    logout() {
      //注销登录信息
      this.$router.push({ path: "/login" });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/styles/variable.scss";

.header-container {
  height: 50px;
  display: flex;
  background-color: $bg_color;
  .logo {
    width: 200px;
    font-size: 20px;

    color: rgba(255, 255, 255, 1);
    line-height: 28px;
    display: flex;
    align-items: center;
    padding-left: 20px;
    // padding: 16px 35px 6px 25px;
  }
  .h_nav {
    flex: 1;
    padding-left: 14px;
    display: flex;
    .list {
      flex: 1;
      height: 100%;

      li {
        float: left;
        width: 90px;
        height: 100%;
        font-size: 15px;

        color: $fontcolor;
        line-height: 50px;
        text-align: center;

        &:hover {
          border-bottom: 2px solid $focusfontcolor;
          cursor: pointer;
        }
        // &.active{
        //   color:$focusfontcolor;
        // }
      }
    }
    .h_user {
      display: flex;
      min-width: 372px;

      padding-right: 24px;

      .gap {
        width: 1px;
        height: 14px;
        margin-top: 18px;
        margin-right: 17px;
        background: $fontcolor;
      }
      .el-dropdown-link {
        color: $fontcolor;
      }
      .el-icon-bell {
        align-self: flex-end;
        width: 12px;
        height: 12px;
        margin-bottom: 5px;
        margin-right: 23px;
        margin-left: 5px;
        color: $fontcolor;
      }
      .bell-text {
        margin-right: 30px;
        color: $fontcolor;
        font-size: 14px;
        color: #fff;
      }
      .el-icon-setting {
        color: $fontcolor;
      }
      .login-user {
        line-height: 50px;
        vertical-align: middle;
        display: -ms-flexbox;
        display: -moz-box;
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        box-align: center;
        -moz-box-align: center;
        -webkit-box-align: center;
        -webkit-align-items: center;
        align-items: center;
        img {
          width: 30px;
          height: 30px;
          display: inline-block;
          border: 1px solid #e4e4e4;
          border-radius: 100%;
          margin-right: 5px;
        }
        .username {
          color: #fff;
          font-size: 14px;
          margin-right: 13px;
        }
      }
    }
  }

  .config-contaniner {
    padding: 16px;
    display: -ms-flexbox;
    display: -moz-box;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    .menu-config {
      width: 300px;
      margin-right: 16px;

      .title-box {
        height: 35px;
        font-size: 14px;
        line-height: 35px;
      }

      .config-box {
        min-height: 300px;
        border: 1px solid #e4e4e4;
        padding: 5px;
      }
    }
    .dashboard-config {
      -moz-box-flex: 1;
      box-flex: 1;
      -webkit-box-flex: 1;
      -webkit-flex: 1;
      flex: 1;
      .buttom-box {
        height: 35px;
      }
      .config-box {
        min-height: 300px;
        border: 1px solid #e4e4e4;
        .module-wraper {
          width: 100%;
          height: 100%;
          border: 1px solid #e4e4e4;
          padding: 5px;
          box-sizing: border-box;
        }
      }
    }
  }
}
</style>

<style lang="scss">
.header-container {
  .bell-item {
    .is-fixed {
      top: 15px;
      right: 30px;
    }
  }
}
.setting-theme-dropdown{
  position:relative;
  .theme-menu-box{
    position:absolute;
    left:-50px;
    top:0px;
    background-color:#fff;
    color:#777;
    padding-right:20px;
    .theme-box{
      width:30px;
      height: 30px;
      background-color:#fee;
      cursor: pointer;
      &.red-theme{
        background-color:#f08519;
      }
      &.gray-theme{
        background-color:#b0b0b0;
      }
    }
  }
}
</style>



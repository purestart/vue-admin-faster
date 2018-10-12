<template>
    <div class="header-container">
       <div class="logo">LOGO</div>
        <div class="h_nav">
            <ul class="list">
              <li class="active">系统管理</li>
              <li>BBB系统</li>
              <li>CCC系统</li>
              <li>DDD系统</li>
            </ul>
          <div class="h_user">
            <div class="gap"></div>
            <el-dropdown
              trigger="click"
              @visible-change="turn1"
              @command="ChangeTheme"
            >
              <i class="el-icon-setting" style="margin-right: 15px" :style="{color:color1}"></i>
              <el-dropdown-menu slot="dropdown">
                <!-- <el-dropdown-item command="1">查看</el-dropdown-item>
                <el-dropdown-item command="2">安全设置</el-dropdown-item> -->
                <el-dropdown-item command="changetheme">切换主题</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>

          <el-popover
            placement="bottom-end"
            trigger="hover"
            width="200"
            v-model="msgPopver">
            <p>您有0条未读消息 <a href="javascript:void(0)">查看所有></a></p>
            <a slot="reference" href="javascript:void(0)">
              <el-badge :value="10" :max="99" class="bell-item">
                <i class="el-icon-bell"></i>
              </el-badge>
            </a>
          </el-popover>

            <el-dropdown
              trigger="click"
              @visible-change="turn2"
              @command="selectSelf"
            >
            <span class="el-dropdown-link" :style="{color:color2}">
               用户名<i class="el-icon-arrow-down el-icon--right" ></i>
            </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="账号信息">账号信息</el-dropdown-item>
                <el-dropdown-item command="安全设置">安全设置</el-dropdown-item>
                <el-dropdown-item divided command="3">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
    </div>
</template>

<script>
//import "./header.scss";

import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      msgPopver:false,
      activeName: "second",
      color1: "",
      color2: ""
    };
  },
  computed: {
    ...mapState({
      msg:state=>state.default.msg,
      Theme:state=>state.default.Theme,
    })
  },
  created() {},
  mounted() {
    // $(".list li").click(function(e) {
    //   $(this)
    //     .addClass("active")
    //     .siblings()
    //     .removeClass("active");
    // });
  },
  methods: {
    ...mapActions(["fetchCourse", "ThemeChange", "LoadHeader"]),
    turn1(a) {
      this.color1='#3C3C3C'
      if (this.Theme.yellowheader) {
        this.color1 = a ? "#3C3C3C" : "#8E6B19";
      } else {
        this.color1 = a ? "#1890ff" : "#ffffff";
      }
    },
    turn2(a) {
      this.color2='#8E6B19'
      if (this.Theme.yellowheader) {
        this.color2 = a ? "#3C3C3C" : "#8E6B19";
      } else {
        this.color2 = a ? "#1890ff" : "#ffffff";
      }
    },
    ChangeTheme(a) {
      switch (a) {
        case "1":
          console.log(222);
          break;
        case "2":
          break;
        case "changetheme":
          this.ThemeChange();
          break;
      }
    },
    selectSelf(a){
      switch (a) {
        case "账号信息":
         this.GoPerson(a);
          break;
        case "安全设置":
          this.GoSecureSetting(a)
          break;
        case "3":
          this.logout();
          break;
      }
    },
    logout(){
        console.log("logout");
        //注销登录信息
        this.$router.push({ path: '/login' });
    },
    GoPerson(key){
      this.LoadHeader(key)
      this.$router.push({ path: '/PersonImfo' });
    },
    GoSecureSetting(key){
      this.LoadHeader(key)
      this.$router.push({ path: '/SecureSetting' });
    }

  }
};
</script>
<style lang="scss" scoped>
@import '../assets/styles/variable.scss';

.header-container{
    height: 50px;
    display: flex;
    background-color: $bg_color;
    .logo{
      width:200px;
      font-size:20px;
      
      color:rgba(255,255,255,1);
      line-height:28px;
      display: flex;
      align-items: center;
      padding-left: 20px;
      // padding: 16px 35px 6px 25px;
    }
    .h_nav{
      flex: 1;
      padding-left: 14px;
      display: flex;
      .list{
        flex:1;
        height: 100%;
        li{
          float: left;
          width:108px;
          height:100%;
          font-size:$m_fontsize;
          
          color:$fontcolor;
          line-height:50px;
          text-align: center;
          
          &:hover{
            border-bottom:2px solid $focusfontcolor;
            cursor: pointer;
          }
          &.active{
            color:$focusfontcolor;
          }
        }
      }
      .h_user{
        display: flex;
        width: 172px;
        justify-content: flex-end;
        padding-right:24px;
        padding-bottom: 16px;
        .gap{
          width: 1px;
          height: 14px;
          margin-top: 18px;
          margin-right: 17px;
          background: $fontcolor;

        }
        .el-dropdown-link{
          color:$fontcolor;
        }
        .el-icon-bell{
          align-self: flex-end;
          width: 12px;
          height:12px;
          margin-bottom: 5px;
          margin-right: 23px;
          margin-left: 5px;
          color:$fontcolor;
        }
        .el-icon-setting{
          color:$fontcolor;
        }
      }
    }

      

  }

  
</style>

<style lang="scss">
  .header-container{
    .bell-item{
      .is-fixed{
        top: 15px;
        right: 30px;
      }
    }
  }
</style>



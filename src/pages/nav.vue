<template>
  <el-row :style="'background-color:'+Theme1.currentTheme.navBgColor" :class="Theme1.currentTheme.className" class="Ynav">
      <h3 class="sys-name" v-if="lips">系统管理</h3>
      <h3 class="sys-name" v-else></h3>
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo menu"
      @select="getHeader"
      :collapse="isCollapse"
      :background-color="Theme1.currentTheme.navBgColor"
      :text-color="Theme1.currentTheme.navTextColor"
      :active-text-color="Theme1.currentTheme.navActiveTextColor"
      :router="true"
    >
      <template v-if="true" v-for="item in menus">
                <el-menu-item v-if="!item.childrens || item.childrens.length==0" :key="item.id" :index="item.url" class="spec_menu_item"><i :class="item.icon"></i><span slot="title">{{item.name}}</span></el-menu-item>
                <el-submenu :popper-class="Theme.yellowheader? 'yellow-pover-class':'blue-pover-class'" v-else-if="item.childrens || item.childrens.length>0" :index="item.id+'_'"  :key="item.id" >
                  <template slot="title">
                    <i :class="item.icon"></i><span slot="title">{{item.name}}</span>
                  </template>
                  <el-menu-item-group>
                    <template v-for="sub2 in item.childrens">
                        <el-menu-item v-if="!sub2.childrens || sub2.childrens.length==0" :index="sub2.url" :key="sub2.id">{{sub2.name}}</el-menu-item>
                          <el-submenu  v-else-if="sub2.childrens || sub2.childrens.length>0" :key="sub2.id" :index="sub2.url" class="submenu3">
                            <span slot="title">{{sub2.name}}</span>
                            <template v-for="sub3 in sub2.childrens">
                                  <el-menu-item :key="sub3.id" :index="sub3.url">{{sub3.name}}</el-menu-item>
                            </template>
                          </el-submenu>
                    </template>
                  </el-menu-item-group>
              </el-submenu>
      </template>
    </el-menu>
  </el-row>
</template>
<style lang="scss">
@import "../assets/styles/variable.scss";
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }

  .el-menu-item-group__title {
      padding: 0px;
      line-height: normal;
      font-size: 12px;
      color: #909399;
  }

.Ynav{
  //  background:#fff;
  h3{
    height: 50px;
    border-bottom: 1px solid #e4e4e4;
    font-size:$l_fontsize;
    font-family:$fontfamily;
    color:#222222;
    display: flex;
    align-items: center;
    padding-left: 10px;
  }
  .el-menu--collapse{
    width: 38px !important;
    .el-submenu__title{
      padding:0 6px !important;
    }
    .el-tooltip{
      padding:0 6px !important;
      width: 37px !important;
    }
  }
  .menu{
    border-right: 0 none;
    .el-menu-item-group__title{
      padding: 0;
    }
    .el-submenu__title{
      padding-left: 6px !important;
      height: 35px;
      line-height: 35px;
      i{
        color:#222222 !important;
      }
    }
    .el-menu-item{
      height: 35px;
      line-height: 35px;
      list-style: disc inside ;
      background:#ffffff !important;
      &:hover{
        background: rgba(253,242,210,1) !important;
      }
    }

    .iconfont{
     
    speak: none;
    font-style: normal;
    font-weight: 400;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    vertical-align: baseline;
    display: inline-block;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

      vertical-align: middle;
      margin-right: 5px;
     
      width: 24px;
      text-align: center;
      font-size: 18px;
      color: #555555 !important;

    }

    .submenu3{
      .el-submenu__title{
        padding-left: 40px !important;
        background:#ffffff !important;
      }

    }
    .spec_menu_item{
      padding-left:  6px !important;
      list-style:none;
      background-color: #ffffff !important;
      i{
        // color: #222222 !important;
         color: #555555 !important;
      }
    }
    .el-submenu__title:hover{
      background: rgba(253,242,210,1) !important;
    }
    .el-icon-message,.el-icon-setting,.el-icon-menu{
      color: white !important;
    }
  }
}

</style>

<script>

  import { mapActions, mapState } from "vuex";

  export default {
    data() {
      return {
        Openactive:'menus',
      };
    },
    created(){
      if(window.sessionStorage.getItem('Openactive')){
          this.Openactive=window.sessionStorage.getItem('Openactive')
      }
    },
    mounted(){
      console.log(this.Theme1.currentTheme);
    },
    computed:{
      ...mapState({
      msg:state=>state.default.msg,
      Theme:state=>state.default.Theme,
      menus:state=>state.default.menus,
      Theme1:state=>state.default.Theme1,
    }),
    },
    props: ['isCollapse','lips'],
    methods: {
      ...mapActions(["LoadHeader"]),

      getHeader(key, keyPath,e){
        // this.Openactive=key
        // const TopHeader=$(e.$el).text()
        // this.LoadHeader(TopHeader)
        // window.sessionStorage.setItem('Openactive',key)
      }
    }
  }
</script>


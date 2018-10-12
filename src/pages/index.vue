<template>
    <div id="index-container">
        
        <div class="header">
            <Header></Header>
        </div>
        <div class="body">
            <div :class="ShowHide?'close-nav':'nav'" :style="Theme.yellowheader ? {backgroundColor:'#ffffff'}:{backgroundColor:'#23336f'}">
               <div :class="[Theme.yellowheader ? 'YShowHide':'BShowHide','ShowHide']" @click="toggleShow($event)">
                 <i class="el-icon-d-arrow-left" v-if="!ShowHide"></i>
                 <i class="el-icon-d-arrow-right" v-else></i>
               </div>
                <Nav :isCollapse="ShowHide" :lips="lips"></Nav>
            </div>
            <div class="container">
              <h3>
                <div class="top">{{header}}</div>
              </h3>
              <transition name="fade-transform" mode="out-in">
                <router-view></router-view>
              </transition>
            </div>
        </div>
    </div>
</template>

<script>

import Nav from "./nav.vue";
import Header from "./header.vue";

import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      ShowHide: false,
      lips:true
    };
  },
  computed: {
    ...mapState({
      msg:state=>state.default.msg,
      Theme:state=>state.default.Theme,
      header:state=>state.default.header
    }),
  },
  methods: {
    ...mapActions(["fetchCourse","deftheme","LoadHeader"]),
    toggleShow($event) {
      this.ShowHide = !this.ShowHide;
     // this.lips=!this.lips;
       this.lips=!this.ShowHide;
    }
  },
  mounted() {
    this.fetchCourse();
    this.deftheme();
    this.LoadHeader();
  },
  components: {
    Nav,
    Header
  }
};
</script>
<style lang="scss" scoped>

#index-container{
  width: 100%;
  height: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
}
.header{

  width: 100%;
  height: 50px;
  line-height: 50px;
  /*background:rgba(255,209,73,1);*/
  min-width: 1000px;
}

.body{
  -moz-box-flex:1;
  box-flex:1;
  -webkit-box-flex:1;
  -webkit-flex:1;
  flex:1;
  display: -ms-flexbox;
  display: -moz-box;
  display:-webkit-box;
  display: -webkit-flex;
  display: flex;
}

.body>.nav{
  /* position: absolute;  */
  /* left: 0;  */
  /* transition: width 0.28s; */

  width: 200px;
  transition: width 0.28s;
  /* top: 0; bottom: 0; */
  overflow-y:auto;overflow-x:hidden;
  position: relative;
  /* .horizontal-collapse-transition {
    transition: 0s width ease-in-out, 0s padding-left ease-in-out, 0s padding-right ease-in-out;
  } */
}

/* .body>.nav>.horizontal-collapse-transition {
  transition: 0s width ease-in-out, 0s padding-left ease-in-out, 0s padding-right ease-in-out;
}

.body>.close-nav>.horizontal-collapse-transition {
  transition: 0s width ease-in-out, 0s padding-left ease-in-out, 0s padding-right ease-in-out;
} */

 .body>.close-nav{

  transition: width 0.28s;
  width: 37px;
  overflow-y:auto;overflow-x:hidden;
  position: relative;
}

.close-nav .ShowHide.YShowHide{
  left:17px;
  transition: left 0.28s;
  color: #fff;
}

.nav .ShowHide.YShowHide{
  left: 179px;
    transition: left 0.28s;
    color: #fff;
} 


.body>.nav::-webkit-scrollbar{
  display: none;
}
.body>.container{
   /* position: absolute;  */
   /* left: 199px; top: 0; right: 0; bottom: 0; */
   overflow: auto;
   background: #f0f2f5;
   min-width: 800px;
   /* z-index: 200; */
   flex: 1;

 }
.body>.container>h3{
  background: #ffffff;
  height:50px;
  padding-left: 16px;
  padding-top: 12px;
}
.body>.container>h3 .top{
  float: left;
  width:124px;
  height:28px;
  font-size:16px;
  font-family:'微软雅黑';
  color:rgba(0,0,0,0.85);
  line-height:28px;
}
/*.body>.container::-webkit-scrollbar{*/
  /*display: none;*/
/*}*/
.BShowHide{
  cursor: pointer;
  text-align: center;
  width: 20px;
  height: 43px;
 background:rgba(44,64,140,1);
  color: #ffffff;
  line-height: 43px;
  position: absolute;
  top: 4px;
  left: 179px;
  z-index: 100;
}
.YShowHide{
  cursor: pointer;
  text-align: center;
  width: 20px;
  height: 43px;
  background:rgba(255,209,73,1);
  color: #222222;
  line-height: 43px;
  position: absolute;
  top: 4px;
  left: 179px;
  z-index: 100;
}


</style>


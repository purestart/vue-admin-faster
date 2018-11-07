
<template>
  <div class="info-box" flex="dir:top box:last" :style="styleObj" v-if="data">
    <div flex="box:last cross:center" class="left-box">
      <div class="left-content">
        <div class="f-36">{{data.title}}</div>
        <div>{{dashboard.name}}</div>
      </div>
      <span class="icon">
        <!-- <cc-icon :name="dashboard.icon" size="50">
          </cc-icon> -->
          <i class="icon-font el-icon-menu"></i>
      </span>
    </div>
    <div class="more" flex="cross:center main:center" @click="more">
      <span>更多</span>
      <!-- <span><cc-icon name="arrow" size="14"></cc-icon></span> -->
    </div>
  </div>
</template>

<script>
// import { Component, Vue, Prop } from 'vue-property-decorator'

export default{
  props:{
    dashboard:{
      type:Object,
      required:true
    },
    data:{
      type:Object,
      required:true,
      default:{},
    }
  },
  data () {
    return {
      styleObj: {
        backgroundColor: this.dashboard.color
      }
    }
  },
  methods:{
    more () {
      this.$router.push(this.data.link)
    }
  }
}
</script>

<style lang="scss" scoped>
  .info-box{
    color: white;
    border-radius: 5px;
    display: -ms-flexbox;
    display: -moz-box;
    display:-webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-direction:column;
    flex-direction:column;
    height: 100%;

    .left-box{
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
      padding: 10px;
      box-align:center;
      -moz-box-align:center;
      -webkit-box-align:center;
      -webkit-align-items:center;
      align-items:center;

      .left-content{
        -moz-box-flex:1;
        box-flex:1;
        -webkit-box-flex:1;
        -webkit-flex:1;
        flex:1;
        .f-36{
          font-size: 36px;
        }
      }
      .icon{
        opacity: 0.8;
        transition: all 0.3s;
        transform-origin: 100% 50%;
        .icon-font{
          font-size: 50px;
          
        }
      }
    }

    .more{
      background: rgba(0,0,0, 0.2);
      text-align: center;
      padding: 5px;
    }

  }
  .root:hover .icon{
    transform: scale3d(1.2, 1.2, 1);
  }
</style>

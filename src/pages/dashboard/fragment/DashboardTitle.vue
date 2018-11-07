
<template>
  <div class="dash-title-wraper" :style="styleObj" flex="cross:center">
    <!-- <cc-icon flex-box="0" class="m-r-10" v-if="dashboard.icon" :name="dashboard.icon"></cc-icon> -->
    <!-- <icon-svg class="icon" name="zonghe"></icon-svg> -->
    <span class="title" flex-box="1">{{dashboard.name}}</span>
    <span flex-box="0" v-if="more" class="ignore c-info f-12 cp" @click="$emit('click')">more</span>
  </div>
</template>
<script>

export default {
  props:{
    dashboard:{
      type:Object,
      required:true,
    },
    more:{
      type:Boolean,
      required:true,
    }
  },

  data () {
    return {
      styleObj: {
        borderTop: `3px solid ${this.dashboard.color}`
      }
    }
  }

}
</script>

<style lang="scss" scoped>
  .dash-title-wraper{
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
        border-bottom: 1px solid #ebeef5;
    .icon{
      margin-right: 5px;
      width: 24px;
      height: 24px;
    }
    .title{
      -moz-box-flex:1;
      box-flex:1;
      -webkit-box-flex:1;
      -webkit-flex:1;
      flex:1;
      font-size: 18px;
    }
  }
</style>

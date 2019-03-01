<template>
    <div class="h-100">
            <dashboard-title :dashboard="dashboard" :more="data && !!data.link" @click="titleClick"></dashboard-title>
    </div>
</template>

<script type='text/ecmascript-6'>
import DashboardTitle from './DashboardTitle.vue'
  export default {
        components:{
    DashboardTitle
  },
    props:{
    dashboard:{
      type:Object,
      required:true,
    },
    data:{
      type:Object,
      required:true
    }
  },
    data () {
      return {
      }
    },
    created () {
    },
    mounted () {

    },
    methods:{
        titleClick(){}
    }
  }
</script>

<style lang='scss' scoped>
  .h-100{
    height: 100%;
    background-color: #ffffff;
  }
</style>

<template>
  <div class="msg-list-board">
    <dashboard-title :dashboard="dashboard" :more="data && !!data.link" @click="titleClick"></dashboard-title>
    <div class="p-10 list" v-if="data">
      <div v-for="(item, index) in data.rows" :key="index" class="b-b p-v-6">
        <div class="f-14 m-b-2 ignore cp to" @click="itemClick(item)">{{item.title}}</div>
        <div class="c-info to">{{item.subTitle}}</div>
      </div>
    </div>
  </div>
</template>

<script>

import DashboardTitle from './DashboardTitle.vue'

export default{
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
  methods:{
    itemClick (item) {
      this.$router.push(item.url)
    },
    titleClick () {
      this.$router.push(this.data.link)
    }
  }
}
</script>

<style lang="scss" scoped>
  .msg-list-board{
    background-color: #ffffff;
  }
  .p-10{
    padding: 10px;
    .p-v-6{
          padding-top: 6px;
      padding-bottom: 6px;
          border-bottom: 1px solid #ebeef5;
        &:first-child {
          padding-top: 0;
      }
      .f-14 {
          font-size: 14px;
      }
          .c-info {
            color: #909399;
            font-size: 12px;
        }

      .m-b-2 {
          margin-bottom: 2px;


      }
    }
    .to {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
  }
  .list .b-b:last-child{
    border: 0;
  }
  .list >div:first-child{
    padding-top: 0;
  }
</style>

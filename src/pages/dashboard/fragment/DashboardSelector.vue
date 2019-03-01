<!--Created by 熊超超 on 2018/7/19.-->
<template>
  <div>
    <!--<slot text="aaa">这是示范jsx中使用slot-scope</slot>-->
    <div class="flex-center" flex='main:center'>
      <el-transfer
          :titles="['可选', '已选']" v-model="mSelected" :data="allDashboard">
      </el-transfer>
    </div>
    <!-- <div flex='main:right' class='m-t-20'><cc-button @click="onSelected" text="确定"></cc-button></div> -->
  </div>
</template>

<script>

// import {Action} from 'vuex-class'

// @Component
export default {
  props:{
    value:{
      type:Array,

    }
  },
  /* vue-props */
  // @Prop(Array) value
  /* vue-vuex */
  // @Action getAllDashboard
  /* vue-data */
  // allDashboard = []
  data () {
    return {
      mSelected: this.value,
      allDashboard:[],
    }
  },
  /* vue-compute */
  /* vue-watch */
  /* vue-lifecycle */
  created () {
    this.initData()
  },
  methods:{
    async initData () {
      //const {data} = await this.getAllDashboard()

      const {data}=require("./alldashborad.json");
     
     //const data=[];
      if (data) {
        this.allDashboard = data.map((dashboard) => ({key: dashboard.id, label: dashboard.name, dashboard}))
      }
    },
    onSelected () {
      const dashboards = this.allDashboard.filter((item) => this.mSelected.includes(item.key))
        .map((item) => item.dashboard)
      this.$emit('selected', dashboards)
    }
  },
  /* vue-method */

}
</script>

<style lang="scss" scoped>
.flex-center{
  display: -ms-flexbox;
  display: -moz-box;
  display:-webkit-box;
  display: -webkit-flex;
  display: flex;
  box-pack:center;
  -webkit--moz-box-pack:center;
  -moz-box-pack:center;
  -webkit-justify-content:center;
  justify-content:center;
}
</style>

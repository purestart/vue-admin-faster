
<template>
  <div class="dash-item" v-loading="loading">
    <dashboard-item-info v-if="dashboard.type =='info'" :data="data" :dashboard="dashboard"></dashboard-item-info>
    <dashboard-item-list v-else-if="dashboard.type =='list'" :data="data" :dashboard="dashboard"></dashboard-item-list>
    <dashboard-item-table v-else-if="dashboard.type =='table'" :data="data" :dashboard="dashboard" @change-page="changePage"></dashboard-item-table>
    <DashboarditemColumnChart v-else-if="dashboard.type =='column'" :data="data" :dashboard="dashboard" v-bind="$attrs"></DashboarditemColumnChart>
    <dashboard-item-note v-else-if="dashboard.type =='funnel'" :data="data" :dashboard="dashboard"></dashboard-item-note>
    <DashboardItemElse v-else :data="data" :dashboard="dashboard" v-bind="$attrs"></DashboardItemElse>
    <!-- <dashboard-item-chart v-else :data="data" :dashboard="dashboard" v-bind="$attrs"></dashboard-item-chart> -->
  </div>
</template>

<script>

// import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
// import {Action} from 'vuex-class'
// import {BaseMixin} from '../../../assets/utils/mixins'
import DashboardItemInfo from './DashboardItemInfo.vue'
import DashboardItemList from './DashboardItemList.vue'
import DashboardItemTable from './DashboardItemTable.vue'
import DashboarditemColumnChart from './DashboarditemColumnChart.vue';
import DashboardItemElse from './DashboardItemElse.vue';
import DashboardItemNote from "./DashboardItemNote.vue";
// import DashboardItemChart from './DashboardItemChart.vue'

// @Component({mixins: [BaseMixin], components: {DashboardItemInfo, DashboardItemList, DashboardItemTable, DashboardItemChart}})
export default{
  props:{
    dashboard:{
      type:Object,
      required:true,
    }
  },
  components:{
    DashboardItemInfo,
    DashboardItemList,
    DashboardItemTable,
    DashboarditemColumnChart,
    DashboardItemNote,
    DashboardItemElse
  },
  data(){
    return{
      loading:false,
      data:{}
    }
  },
  // /* vue-props */
  // @Prop() dashboard
  // /* vue-vuex */
  // @Action getDashboardData
  // /* vue-data */
  // data = null
  // /* vue-compute */
  // /* vue-watch */
  // @Watch('dashboard.id', {immediate: true})
  // idChange () {
  //   this.initData()
  // }
  mounted(){
    this.initData();
  },
  computed:{
    dashboardId(){
      return this.dashboard.id;
    }
  },
  watch:{
    dashboardId(val,old) {
        
        this.initData();
    }
  },
  methods:{
    changePage (pageNum) {
      this.initData({pageNum, pageSize: 5})
    },
    initData(params = {pageSize: 5}){
        this.loading = true;

        // this.$http.get(`${window.SITE_CONFIG['baseURL']}/sys/info`).then(({res}) => {
        //     this.loading = false;
        //     if (res.data) {
        //       this.data = res.data;
        //     }
        // });
        if(this.dashboard.type=='info'){ //获取消息的
           // console.log(this.dashboard);
            // if(this.dashboard.name=='我的工单'){
            //   this.data={link:"/baseData/page/user",title:"40%"}
            // }
            this.data={link:"/baseData/page/user",title:"40%"}
            this.loading = false;
        }else if(this.dashboard.type=='list'){
          let {data}=require("./itemlist.json");
          this.data=data;
          this.loading = false;
        }else if(this.dashboard.type=='table'){
          let {data}=require("./itemtable.json");
         // console.log(data);
          this.data=data;
          this.loading = false;
        }else{
          this.loading = false;
        }
    }
  }
  
  /* vue-lifecycle */
  /* vue-method */
  // async initData (params = {pageSize: 5}) {
  //   this.loading = true
  //   const {data} = await this.getDashboardData({url: this.dashboard.url, params})
  //   this.loading = false
  //   if (data) {
  //     this.data = data
  //   }
  // }


}
</script>

<style lang="scss" scoped>
.dash-item{
  height: 100%;
}
</style>

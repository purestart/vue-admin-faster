
<template>
  <div v-if="data" flex="dir:top box:justify" class="h-100">
    <dashboard-title :dashboard="dashboard" :more="data && !!data.link"></dashboard-title>
    <div>
      <dy-table :rows="data.rows" :columns="data.columns" size="mini"></dy-table>
    </div>
    <el-pagination class="p-10 a-c" small layout="prev, pager, next" :total="data.total" :page-size="5" :current-page.sync="currentPage">
    </el-pagination>
  </div>
</template>

<script>
// import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import DashboardTitle from './DashboardTitle.vue'
import { watch } from 'fs';
import DyTable from '../../../components/DyTable/DyTable';

// @Component({components: {DashboardTitle}})
export default{
  props:{
    dashboard:{
      type:Object,
      required:true
    },
    
    data:{
      type:Object,
      required:true
    }
  },
  components:{
    DashboardTitle,
    DyTable
  },
  data(){
    return{
      currentPage:1,
    }
  },
  watch:{
    currentPage(){
        this.$emit('change-page', this.currentPage);
    }
  }

  /* vue-props */
  // @Prop() dashboard
  // @Prop(Object) data
  /* vue-vuex */
  /* vue-data */
  // currentPage = 1
  /* vue-compute */
  /* vue-watch */
  // @Watch('currentPage')
  // currentPageChange () {
  //   this.$emit('change-page', this.currentPage)
  // }
  /* vue-lifecycle */
  /* vue-method */
}
</script>

<style lang="scss" scoped>
.h-100{
  background-color: #ffffff;
  height: 100%;
}
</style>

/*
* Description:施工队
* Author:
* Update:
*/
<template>
    <div class="work-team--container">
        <div class="header-box">
            <a href="javascript:void(0)">派工汇总</a>
            <a href="javascript:void(0)">施工进度</a>
            <a href="javascript:void(0)">验收</a>
            <a href="javascript:void(0)">整改</a>
        </div>
        <div class="table-wraper">
                <el-table
                    :data="dataList"
                    border
                    size="small"
                    v-loading="dataListLoading"
                    @selection-change="selectionChangeHandle"
                    style="width: 100%;">
                    <el-table-column
                        prop="name"
                        header-align="center"
                        align="center"
                        label="所属项目">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        header-align="center"
                        align="center"
                        label="工程名称">
                    </el-table-column>
                     <el-table-column
                        prop="name"
                        header-align="center"
                        align="center"
                        label="状态">
                    </el-table-column>
                </el-table>
        </div>
    </div>
</template>

<script type='text/ecmascript-6'>
  export default {
    data () {
      return {
          dataList:[],
          dataListLoading:false,
      }
    },
    created () {
    },
    mounted () {

    },
    methods:{
        selectionChangeHandle(){},
    }
  }
</script>

<style lang='scss' scoped>
.work-team--container{
    padding: 16px;
    margin: 16px;
    background-color: #ffffff;
    .header-box{
        border-bottom: 1px solid #e4e4e4;
        padding-bottom: 16px;
        a{
            margin-right: 10px;
            font-size: 14px;
        }
    }
    .table-wraper{
        margin-top: 16px;
    }
}
</style>
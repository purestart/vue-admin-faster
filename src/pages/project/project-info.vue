/*
* author:詹陈龙
* description:项目动态页
* update:
*/
<template>
    <div class="dynamic-container">
    
    <div class="tool-bar">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="全部项目" name="全部"></el-tab-pane>
            <el-tab-pane label="开发中项目" name="开发中"></el-tab-pane>
            <el-tab-pane label="已完成项目" name="已完成"></el-tab-pane>

        </el-tabs>
        <div class="handle">
            <el-row>
                <el-button type="primary"  size="mini" @click="open"><i class="el-icon-plus"></i> 新增</el-button>
            </el-row>
            <div class="kk">
                
                <el-input placeholder="请输入项目名称" class="inline-input clear-right-radius" size="mini">
                    
                </el-input>
                <el-button type="primary" icon="el-icon-search" size="mini" class="el_button"></el-button>

                <el-button icon="el-icon-search" v-if="false" size="mini" class="pop_btn">高级查询</el-button>

            </div>
        </div>
    </div>
    <div class="table-wrapper">

        <el-table
            ref="singleTable"
            :data="filterData"
            size="small"
            highlight-current-row
            border
            stripe
            @current-change="handleCurrentChange"
            style="width: 100%">

            <el-table-column
            prop="name"
            label="项目名称"
            width="120">
            </el-table-column>


            <el-table-column
            prop="number"
            label="项目编号"
            >
            </el-table-column>

            <el-table-column
            prop="status"
            label="项目状态"
            >
            </el-table-column>

            <el-table-column
            prop="remark"
            label="备注"
            >
            </el-table-column>

        <el-table-column label="操作" width="180">
            <template slot-scope="scope">

                <a href="javascript:void(0)">编辑</a>
                <span class="division">|</span>
                <a href="javascript:void(0)">删除</a>
                <!-- <span class="division">|</span> -->
                <!-- <a @click="()=>centerDialogVisible=true" href="javascript:void()">菜单授权</a> -->

            </template>
            </el-table-column>

        </el-table>
        <div class="pagination-wrpper">
           <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 15, 20, 25]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :background="true"
            :total="20">
            </el-pagination>
        </div>
    </div>


    <el-dialog
        title="提示"
        :visible.sync="centerDialogVisible"
        width="30%"
        center>
        <span>需要注意的是内容是默认不居中的</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
        </span>
     </el-dialog>

    </div>

</template>

<script type='text/ecmascript-6'>
    import { mapActions, mapState } from "vuex";
    

  export default {
    components: {
        
    },
    data () {
      return {
          activeName:"全部",
          centerDialogVisible:false,
          currentPage:1,
          tableData: [{
          date: '2016-05-02',
          name: '后台管理系统',
          number:"OPAI18455482",
          status:"开发中",
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '在线商城',
          number:"OPAI18254625",
          status:"已完成",
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '家具设计开发',
          number:"OPAI18254665",
          status:"开发中",
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '物料系统',
          number:"OPAI18254695",
          status:"已完成",
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        currentRow: null
      }
    },
    computed:{
        filterData(){
            return this.tableData.filter((item)=>{
                if(this.activeName=='全部'){
                    return true;
                }else{
                    if(this.activeName==item.status){
                         return true;
                    }else{
                         return false;
                    }
                }
                return false;
            });
        }
    },
    created () {
    },
    mounted () {

    },
    methods:{
        handleClick(){},
      handleCurrentChange(val) {
        this.currentRow = val;
      },
      open(){},
      handleSizeChange(){},
      handleCurrentChange(){}
    }
  }
</script>

<style lang='scss' scoped>

    .input-with-select .el-input-group__prepend {
        background-color: #fff;
    }
    .dynamic-container{
        padding: 16px;
        margin: 16px;
        background-color: #ffffff;
        .item-editer{
            width: 100%;
            .input-box{
                

                .item-row{
                    display: flex;
                    padding-top: 10px;
                    padding-bottom: 10px;
                }
                .item{
                    margin-right: 10px;
                    .label{
                        font-size: 13px;
                        display: inline-block;
                        width: 70px;
                        text-align: right;
                    }
                    .item-input{
                        display: inline-block;
                        width:200px;
                    }
                }
            }
            .edit-box{
                display: flex;
                justify-content: space-between;
                align-items: center;
                .submit-box{
                    border-left:1px solid #e4e4e4;
                    display: flex;
                    justify-content: center;
                    flex-direction: column;
                    padding: 0px 40px;
                    
                    align-items: center;
                    .btn{
                        margin-top: 10px;
                    }
                    
                }
            }
        }
        .table-wrapper{
            width: 100%;
            margin-top: 10px;
            .pagination-wrpper{
                text-align: right;
                margin-top: 10px;
            }
            .division{
                margin: 0 5px;
                color: #e4e4e4;
            }
        }

        .tool-bar{
            width: 100%;
            
            .handle{
                height: 28px;
                display: flex;
                margin-top: 0px;
                justify-content: space-between;
                .el-row{
                display: flex;
                }
                .kk{
                align-self: flex-end;
                display: flex;
                .el_button{
                    border-radius: 0 4px 4px 0 ;
                    width: 28px;
                    min-width: 28px;
                    height: 28px;
                    padding: 0;
                    margin-right: 0px;
                }
                .h_btn{
                    width: 28px !important;
                    min-width: 28px !important;
                    height: 28px !important;
                    padding: 7px 0 !important;
                    color:#1989FA;
                }
                .h_btn1{
                    margin-left: 10px !important;
                }
                }
            }
        }
        
    }
</style>
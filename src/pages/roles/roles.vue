/*
* author:詹陈龙
* description:角色管理 列表
* update:2018-08-07
*/
<template>
    <div class="roles-container">
    
    <div v-if="searchBoxVisible" class="item-editer">

        <el-card>
            <div class="edit-box">
                <div class="input-box">
                    <div class="item-row">
                        <div class="item">
                            <span class="label">名角色名称</span>
                            <el-input class="item-input"  size="mini" />
                        </div>
                    
                        <div class="item">
                            <span class="label">描述</span>
                            <el-input class="item-input"  size="mini" />
                        </div>
                         <div v-for="item in 5" class="item">
                            <span class="label">描述</span>
                            <el-input class="item-input"  size="mini" />
                        </div>
                    </div>

                </div>

                <div class="submit-box">
                    <div>
                        <el-button type="danger" size="mini">重置</el-button>
                    </div>
                     <div class="btn">
                        <el-button type="primary" size="mini">查询</el-button>
                     </div>
                     
                </div>
            </div>
        </el-card>

    </div>
    
    <div class="tool-bar">

        <div class="handle">
            <el-row>
            <el-button type="primary"  size="mini" @click="open"><i class="el-icon-plus"></i> 新增</el-button>
            <!-- <el-button type="primary"  size="mini" @click="open"><i class="el-icon-edit"></i> 编辑</el-button>
            <el-button type="primary"  size="mini" @click="open"><i class="el-icon-delete"></i> 删除</el-button>
            <el-button type="primary"  size="mini" @click="open"><i class="fa fa-key"></i> 授权</el-button>
            <el-button type="primary"  size="mini" @click="open"><i class="fa fa-key"></i> 授权查看</el-button> -->
            </el-row>
            <div class="kk">
                
                <el-input class="inline-input clear-right-radius" size="mini">
                    
                </el-input>
                <el-button type="primary" icon="el-icon-search" size="mini" class="el_button"></el-button>

                <el-button @click="searchBoxVisible=true" icon="el-icon-search"  size="mini" class="pop_btn">高级查询</el-button>

            </div>
        </div>
    </div>
    <div class="table-wrapper gray-header">
        <el-table
            ref="singleTable"
            :data="tableData"
            size="small"
            highlight-current-row
            border
            stripe
            @current-change="handleCurrentChange"
            style="width: 100%">

            <el-table-column
            prop="name"
            label="角色名称"
            width="120">
            </el-table-column>
            <el-table-column
            prop="desc"
            label="备注"
            >
            </el-table-column>

        <el-table-column label="操作" width="180">
            <template slot-scope="scope">

                <a href="/">编辑</a>
                <span class="division">|</span>
                <a href="/">删除</a>
                <span class="division">|</span>
                <a @click.prevent="()=>centerDialogVisible=true" href="javascript:void(0)">菜单授权</a>

            </template>
            </el-table-column>

        </el-table>
        <div class="pagination-wrpper">
           <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 15, 20, 25]"
            :page-size="10"
            layout="total, prev, pager, next"
            :background="true"
            :total="20">
            </el-pagination>
        </div>
    </div>


    <MenuTree :visible="centerDialogVisible" :beforeClose="beforeClose" />


    </div>

</template>

<script type='text/ecmascript-6'>
    import { mapActions, mapState } from "vuex";
    import MenuTree from './MenuTree/MenuTree.vue';
    

  export default {
    components: {
        MenuTree,
    },
    data () {
      return {
          centerDialogVisible:false,
          currentPage:1,
          tableData: [{
          id: '2016-05-02',
          name: '超级管理员',
          desc: '所有权限'
        }, {
          id: '2016-05-04',
          name: '系统管理员',
          desc: '部分权限'
        }, {
          id: '2016-05-01',
          name: '部门管理员',
          desc: '部门权限'
        }, {
          id: '2016-05-03',
          name: '普通用户',
          desc: '部分权限'
        }],
        currentRow: null,
        searchBoxVisible:false,
      }
    },
    created () {
    },
    mounted () {

    },
    methods:{
        beforeClose(){
            console.log("beforeClose");
            this.centerDialogVisible=false;
        },
      handleCurrentChange(val) {
        this.currentRow = val;
      },
      open(){
          this.$notify({
          title: '成功',
          message: '这是一条成功的提示消息',
          type: 'success'
        });
      },
      handleSizeChange(){},
      handleCurrentChange(){}
    }
  }
</script>
<style lang="scss">
    .item-editer{
        .el-card__body{
            padding-bottom: 0px;
        }
    }
</style>

<style lang='scss' scoped>

    .input-with-select .el-input-group__prepend {
        background-color: #fff;
    }
    .roles-container{
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
                    -moz-flex-wrap:wrap;
                    -webkit-box-lines:multiple;
                    -webkit-flex-wrap:wrap;
                    flex-wrap:wrap;
                }
                .item{
                    min-width: 260px;
                    margin-bottom: 20px;
                    .label{
                        font-size: 12px;
                        margin-right: 10px;
                        min-width: 60px;
                        text-align: right;
                        display: inline-block;
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
                margin-top: 10px;
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
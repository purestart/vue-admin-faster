<template>
    <div class="users-container">
        <div class="user-box">
            <div class="groups-wraper">
                <el-tree
                    
                    :data="menusData"
                    style="background-color:#f0f2f5;"
                    node-key="id"
                    :default-expanded-keys="[2, 3]"
                    :default-checked-keys="[5]"
                    :props="defaultProps">
                </el-tree>
            </div>
            <div class="user-wraper">
                <div class="search-box">
                    
                    <div class="input-item">
                         <span class="label">姓名：</span>
                         <el-input placeholder="按姓名查询" class="inline-input" size="small">
                         </el-input>
                    </div>

                </div>
                <div class="tool">
                    <el-button type="primary"  size="mini"><i class="el-icon-plus"></i> 新增</el-button>
                    <el-button type="primary"  size="mini" ><i class="el-icon-plus"></i> 导入</el-button>
                    <el-button type="primary"  size="mini" ><i class="el-icon-plus"></i> 导出</el-button>

                    <el-button type="primary"  style="float:right" size="mini" ><i class="el-icon-search"></i> 查询</el-button>
                </div>
                <div class="table-wraper">
                    <el-table
                        ref="singleTable"
                        :data="tableData"
                        size="small"
                        highlight-current-row
                        border
                        stripe
                        
                        >

                        <el-table-column
                        prop="name"
                        label="姓名"
                        width="120">
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="电话"
                        >
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="归属公司"
                        >
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
                </div>

                <div class="pagination-wrpper">
                    <el-pagination
                   
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
        </div>
    </div>
</template>

<script type='text/ecmascript-6'>
  export default {
    data () {
      return {
          currentPage:1,
          menusData: [{
          id: 1,
          label: '北京总公司',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '广州分公司',
          children: [{
            id: 5,
            label: '菜单管理'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '武汉分公司',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
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
      }
    },
    created () {
    },
    mounted () {

    },
    methods:{
        handleCurrentChange(){},
    }
  }
</script>

<style lang='scss' scoped>
    .users-container{
        padding: 16px;
        margin: 16px;
        background-color: #ffffff;
        .user-box{

            .groups-wraper{
                width: 300px;
                background-color: #f0f2f5;
                padding: 20px 10px;
                flex-shrink: 0;
                float: left;
                min-height: 500px;
                
            }
            .user-wraper{
                // -moz-box-flex:1;
                // box-flex:1;
                // -webkit-box-flex:1;
                // -webkit-flex:1;
                // flex:1;
                // flex-shrink: 0;

                margin-left: 330px;
                .search-box{
                    margin-bottom: 16px;
                    .input-item{
                        display: inline-block;
                        margin-right: 10px;
                        .label{
                            font-size: 14px;
                        }
                    }
                    .inline-input{
                        width: 200px;
                    }
                }
                .tool{
                    margin-bottom: 16px;
                }
                .pagination-wrpper{
                    padding-top: 16px;
                    text-align: right;
                }
            }
        }
    }
</style>
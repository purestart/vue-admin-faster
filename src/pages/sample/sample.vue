
<template>
  <div class="page-sample--list">

    <div v-if="advanceSearchVisible" class="item-editer">
        <el-card>
            <div class="edit-box">
                <div class="input-box">
                    <div class="item-row">
                        
                          <div class="item">
                            <span class="label">名称</span>
                            <el-input class="item-input" size="small" v-model="dataForm.name" placeholder="名称" clearable></el-input>
                          </div>
                          
                        <div class="item">
                            <span class="label">日期</span>
                            <!-- <el-input class="item-input"  size="small" /> -->
                            <el-date-picker
                            class="item-input" size="small"
                              type="datetime"
                              v-model="dataForm.create_date"
                              placeholder="日期"
                            >
                            </el-date-picker>
                        </div>
                          
                    </div>
                </div>
                <div class="submit-box">
                    <div>
                        <el-button type="danger" @click="resetForm()" size="mini">重置</el-button>
                    </div>
                     <div class="btn">
                        <el-button type="primary" @click="queryForm()" size="mini">提交</el-button>
                     </div>
                </div>
            </div>
        </el-card>
    </div>
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">

      <el-form-item>
        <el-input size="small"  v-model="dataForm.name" placeholder="名称" clearable></el-input>
      </el-form-item>
  
      
      <el-form-item v-if="$hasPermission('sample:sample:query')">
          <el-button size="small" @click="queryForm()">查询</el-button>
      </el-form-item>
        
      <el-form-item v-if="$hasPermission('sample:sample:save')">
          <el-button size="small"  type="primary" @click="addOrUpdateHandle()">新增</el-button>
      </el-form-item>
         
      <el-form-item v-if="$hasPermission('sample:sample:delete')">
          <el-button size="small"  type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>
      </el-form-item>
         
      <el-form-item v-if="$hasPermission('sample:sample:import')">
        <el-button size="small"  type="info" @click="exportHandle()">导入</el-button>
      </el-form-item>
           
      <el-form-item v-if="$hasPermission('sample:sample:export')">
        <el-button size="small" type="success" @click="exportHandle()">导出</el-button>
      </el-form-item>
        
      <el-form-item  v-if="$hasPermission('sample:sample:query')"  style="float:right">
        <el-button icon="el-icon-search" @click="advanceSearchVisible=!advanceSearchVisible" size="small" class="pop_btn">高级查询</el-button>
       </el-form-item>
         
    </el-form>
    <el-table
      :data="dataList"
      border
      size="small"
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%;">
      <el-table-column
        type="selection"
        header-align="center"
        align="center"
        width="50">
      </el-table-column>

      <el-table-column
        prop="name"
        header-align="center"
        align="center"
        label="名称">
      </el-table-column>

      <el-table-column
        header-align="center"
        align="center"
        label="创建日期">
        <template slot-scope="scope">
            <div>
                {{scope.row.create_date | dateformat}}
            </div>
        </template>
      </el-table-column>

      <el-table-column
        prop="remarks"
        header-align="center"
        align="center"
        label="备注">
      </el-table-column>

      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          
          <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.id)"  v-if="$hasPermission('sample:sample:edit')">修改</el-button>
              
          
          <el-button type="text" size="small" @click="deleteHandle(scope.row.id)"  v-if="$hasPermission('sample:sample:delete')">删除</el-button>
              
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-wraper">
    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    </div>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update :visible="addOrUpdateVisible" ref="addOrUpdate" @closeModel="addOrUpdateVisible=false" @refreshDataList="getDataList"></add-or-update>
  </div>
</template>

<script>
  import AddOrUpdate from './sample-add-or-update'
  export default {
    data () {
      return {
        dataForm: {
          name: '',
          
        },
        query:{},
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false,
        advanceSearchVisible:false
      }
    },
    components: {
      AddOrUpdate
    },
    activated () {
      this.getDataList()
    },
    methods: {
      resetForm(){
        this.dataForm={};
        this.query={};
      },
      queryForm(){
        this.query=JSON.parse(JSON.stringify(this.dataForm));
        this.getDataList();
      },
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$axios.get(
          `${this.$baseUrl}/sample/sample/list`,
          {
              params: {
                  'pageNum': this.pageIndex,
                  'pageSize': this.pageSize,
                  'query': this.query
              }
          }
        ).then(({data}) => {
          if (data && data.success == 1) {
            this.dataList = data.data.list
            this.totalPage = data.data.total
          } else {
            this.dataList = []
            this.totalPage = 0
          }
          this.dataListLoading = false
        })
      },
      // 每页数
      sizeChangeHandle (val) {
        this.pageSize = val
        this.pageIndex = 1
        this.getDataList()
      },
      // 当前页
      currentChangeHandle (val) {
        this.pageIndex = val
        this.getDataList()
      },
      // 多选
      selectionChangeHandle (val) {
        this.dataListSelections = val
      },
      // 新增 / 修改
      addOrUpdateHandle (id) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.dataForm.id = id || 0
          this.$refs.addOrUpdate.init()
        })
      },
      // 删除
      deleteHandle (id) {
        var ids = id ? [id] : this.dataListSelections.map(item => {
          return item.id
        })
        this.$confirm(`确定进行${id ? '删除' : '批量删除'}操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.post(
              `${this.$baseUrl}/sample/sample/delete`,
               {ids}
           ).then(({data}) => {
            if (data && data.success === 1) {
              this.getDataList()
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.getDataList()
                }
              })
            } else {
             
              this.$message({
                message: data.errMsg,
                type: 'error',
                duration: 1500,
              })
            }
          })
        }).catch(() => {})
      }
    }
  }
</script>
<style lang="scss" scoped>
  .page-sample--list{
    margin: 16px;
    padding: 16px;
    background-color: #ffffff;
    .item-editer{
            width: 100%;
            margin-bottom: 16px;
            .input-box{
                .item-row{
                    display: flex;
                    padding-top: 10px;
                    padding-bottom: 10px;
                    -moz-flex-wrap:wrap;
                    -webkit-box-lines:multiple;
                    -webkit-flex-wrap:wrap;
                    flex-wrap:wrap;
                    .item{
                        margin-right: 5px;
                        margin-bottom: 16px;
                        .label{
                            font-size: 14px;
                            display: inline-block;
                            min-width: 65px;
                            text-align: right;
                        }
                        .item-input{
                            display: inline-block;
                            width:200px;
                        }
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
    .pagination-wraper{
      margin-top: 16px;
      text-align: right;
    }
  }
</style>


/*
* author:詹陈龙
* description:菜单管理 列表
* update:2018-08-07
*/
<template>
  <div class="app-container">
    <div class="handle">
    <el-row>
      <el-button size="small" v-if="true" type="primary" @click="addOrUpdateHandle()">新增</el-button>
      
    </el-row>
    </div>
    <div class="table-wrapper">
    <tree-table :data="sourceData" :evalFunc="func" :evalArgs="args" :typeName="typeName" :expandAll="expandAll" >
      <el-table-column
        header-align="center"
        align="center"
        label="图标">
        <template slot-scope="scope">
          <!-- <icon-svg :name="scope.row.icon || ''"></icon-svg> -->
          <i :class='scope.row.icon'></i>
        </template>
      </el-table-column>

      <el-table-column
        prop="type"
        header-align="center"
        align="center"
        label="类型">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.type === 0" size="small">目录</el-tag>
          <el-tag v-else-if="scope.row.type === 1" size="small" type="success">菜单</el-tag>
          <el-tag v-else-if="scope.row.type === 2" size="small" type="info">按钮</el-tag>
        </template>
      </el-table-column>

        <el-table-column
        prop="order_num"
        header-align="center"
        align="center"
        label="排序号">
      </el-table-column>
      <el-table-column
        prop="url"
        header-align="center"
        align="center"
        width="150"
        :show-overflow-tooltip="true"
        label="菜单URL">
      </el-table-column>
      <el-table-column
        prop="perms"
        header-align="center"
        align="center"
        width="150"
        :show-overflow-tooltip="true"
        label="授权标识">
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <!-- $hasPermission('sys:menu:update') -->
          <el-button v-if="true" type="text" size="small" @click="addOrUpdateHandle(scope.row.menu_id)">修改</el-button>
          <el-button v-if="true" type="text" size="small" @click="deleteHandle(scope.row.menu_id)">删除</el-button>
        </template>
      </el-table-column>

    </tree-table>
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
    </div>
  </div>
</template>

<script>
/**
  Auth: Lei.j1ang
  Created: 2018/1/19-14:54
*/
import treeTable from '../../components/TreeTable'
import treeToArray from '../../components/TreeTable/eval.js'
import AddOrUpdate from './menu-add-or-update'

export default {
  name: 'Menus',
    components: {
    treeTable,
    AddOrUpdate
  },
  data() {
    return {
      dataListLoading: false,
      addOrUpdateVisible: false,
      func: treeToArray,
      expandAll: false,
      typeName:"菜单名称",
      dynamicTags: ["请至少选择一个数据项进行操作"],
      sourceData:{},
      args:null,
    }
  },
  mounted(){
    this.getDataList();
  },
  methods: {
    message(row) {
      this.$message.info(row.name)
    },
    getDataList(){
      this.$axios.get(`${this.$baseUrl}/sys/menu/nav`).then(({data}) => {
          console.log(data);
          this.sourceData=data.data;
      })
    },
    open(){

    },
    addOrUpdateHandle (id) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.dataForm.id = id || 0
          this.$refs.addOrUpdate.init()
        })
      },
      // 删除
      deleteHandle (id) {
        this.$confirm(`确定对[id=${id}]进行[删除]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.post(
            `${this.$baseUrl}/sys/sys-menu/delete`,
            {
              ids: [id]
            }
          ).then(({data}) => {
            if (data && data.success === 1) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.getDataList()
                }
              })
            } else {
              this.$message.error(data.msg)
            }
          })
        }).catch(() => {})
      }
  }
}
</script>

<style lang="scss" scoped>
.app-container{
  overflow: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  background: #ffffff;
   margin: 16px;
  .handle{
    height: 28px;
    display: flex;
    margin-top: 10px;
     margin-bottom: 10px;
    justify-content: space-between;
    .el-row{
      display: flex;
    }
    .kk{
      align-self: flex-end;
      display: flex;

      .el-autocomplete{
        input{
          border-radius: 4px 0 0 4px !important;
          width: 172px;
        }
      }
      .el_button{
        border-radius: 0 4px 4px 0 ;
        width: 28px;
        min-width: 28px;
        height: 28px;
        padding: 0;
        margin-right: 10px;
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
      .el-select{
        width: 70px !important;
        .el-input__inner{
          padding:0 18px 0 0 !important;
          text-align: center;
        }
      }
    }
  }
}

</style>


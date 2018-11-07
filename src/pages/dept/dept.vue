<template>
  <div class="sys-dept--list">
    <el-form :inline="true" :model="dataForm">
      <el-form-item>
        <!-- $hasPermission('sys:dept:save') -->
        <el-button size="small" v-if="true" type="primary" @click="addOrUpdateHandle()">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      border
      size="small"
      style="width: 100%;">
      <el-table-column
        prop="deptId"
        header-align="center"
        align="center"
        width="80"
        label="ID">
      </el-table-column>
      <table-tree-column
        prop="name"
        header-align="center"
        treeKey="deptId"
        label="名称">
      </table-tree-column>
      <el-table-column
        prop="parentName"
        header-align="center"
        align="center"
        label="上级部门">
      </el-table-column>
      <el-table-column
        prop="orderNum"
        header-align="center"
        align="center"
        width="80"
        label="排序号">
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <!-- $hasPermission('sys:dept:update') -->
          <el-button v-if="true" type="text" size="small" @click="addOrUpdateHandle(scope.row.deptId)">修改</el-button>
          <el-button v-if="true" type="text" size="small" @click="deleteHandle(scope.row.deptId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
  </div>
</template>

<script>
  import TableTreeColumn from '@/components/table-tree-column'
  import AddOrUpdate from './dept-add-or-update'
  import { treeDataTranslate } from '@/utils'
  export default {
    data () {
      return {
        dataForm: {},
        dataList: [],
        dataListLoading: false,
        addOrUpdateVisible: false
      }
    },
    components: {
      TableTreeColumn,
      AddOrUpdate
    },
    activated () {
      this.getDataList()
    },
    methods: {
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        const data=require("../roles/dept-list.json");
//        this.$http.get(`${window.SITE_CONFIG['baseURL']}/sys/dept/list`).then(({data}) => {
          this.dataList = treeDataTranslate(data || [], 'deptId')
          this.dataListLoading = false
//        })

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
        this.$confirm(`确定对[id=${id}]进行[删除]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post(
            `${window.SITE_CONFIG['baseURL']}/sys/dept/delete`,
            {
              'deptId': id
            },
            {
              headers: { 'content-type': 'application/x-www-form-urlencoded' }
            }
          ).then(({data}) => {
            if (data && data.code === 0) {
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
.sys-dept--list{
margin: 16px;
padding: 16px;
background-color: #ffffff;
}
</style>


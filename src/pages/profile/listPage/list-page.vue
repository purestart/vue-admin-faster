/*
* author:詹陈龙
* description:个人中心-个人训练监控
* update:
*/
<template>
  <div class="profile-list-page">
    <!--<loading></loading>-->

    <div class="handle">

    <div class="kk">
        <!-- <input-component></input-component> -->
            <el-date-picker
            size="small"
            v-model="selectDate"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        
        <el-button type="primary" style="margin-left:10px;" size="mini" @click="infoo"> 查询</el-button>
      </div>
    </div>
    <template>
      <el-table
        :data="tableData"
        style="width: 100%;margin-top:15px;"
        highlight-current-row
        border
        stripe
        size="small"
        max-height="250">
        <el-table-column
          prop="date"
          label="日期"
          width="150"
          min-width="150">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="120"
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="province"
          label="省份"
          width="120"
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="city"
          label="市区"
          width="120"
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址"
          width="300"
          min-width="300">
        </el-table-column>
        <el-table-column
          prop="zip"
          label="邮编"
          width="120"
          min-width="120">
        </el-table-column>
        <el-table-column
          label="操作"
          min-width="178"
          >
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="updateRow(scope.$index, tableData)"
              type="primary"
              size="small">
              编辑
            </el-button>
            <el-button
              @click.native.prevent="deleteRow(scope.$index, tableData)"
              type="danger"
              size="small">
              移除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <div style="margin-top:10px;">

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 15, 20, 25]"
      :page-size="10"
      layout="total, prev, pager, next"
      :background="true"
      :total="0">
    </el-pagination>
    </div>
  </div>
</template>

<script>

import { mapActions, mapState } from "vuex";

import "./list-page.scss";

//import Page1Edit from "./Page1Edit"
export default {
  data() {
    return {
      selectDate:"",
      currentPage: 1,
      kobe: "菜单管理",
      status: false,
      handelId: 0,
      timeout: null,
      edit:false,
      dynamicTags: ["请至少选择一个数据项进行操作"],
      newdata:[]
    }
  },
  components: {
    
  },
  computed:{
  ...mapState(["editData","tableData"])
  },
  methods: {
    ...mapActions(["DataEdit"]),
    addMargin(el) {

    },
    minMargin(el) {

    },
    open() {
      this.$prompt("菜品名称", "新增菜品名称", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /\S/,
        inputErrorMessage: "新增菜品名称不能为空！"
      })
        .then(({ value }) => {
          this.$message({
            type: "success",
            message: "新增菜品 :" + value
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    modify() {
      clearTimeout(this.timeout);
      if (this.handelId === 0) {
        this.$notify({
          title: "警告",
          message: "请至少选择一个数据项进行操作！",
          type: "warning",
          position: "bottom-right",
          duration: 1500
        });
        return false;
      }
    },
    Shanchu() {
      clearTimeout(this.timeout);
      if (this.handelId === 0) {
        this.$notify({
          title: "成功",
          message: "恭喜！你所提交的信息已审核通过，如有问题请联系客服。",
          type: "success",
          position: "bottom-right",
          duration: 1500
        });
        return false;
      }
    },
    infoo() {
      clearTimeout(this.timeout);
      if (this.handelId === 0) {
        this.$notify({
          title: "消息",
          message: "系统将于15:00-17:00进行升级，请及时保存你的资料。",
          type: "info",
          position: "bottom-right",
          duration: 1500
        });
        return false;
      }
    },
    Erroo() {
      clearTimeout(this.timeout);
      if (this.handelId === 0) {
        this.$notify({
          title: "错误",
          message: "系统错误，请稍后重试。",
          type: "error",
          position: "bottom-right",
          duration: 1500
        });
        return false;
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    handleClose(tag) {
      // this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      this.status = false;
    },
    handleOpen(id) {
      if (id) {
        this.handelId = id;
      } else {
        this.handelId = 0;
      }
    },
    // CurrentChange(val){
    //   this.handleOpen(val.id)
    // },
    deleteRow(idx,data){
     data.splice(idx,1)
    },
    updateRow(idx,data){
      const passrow=data[idx]
      this.DataEdit(passrow)
      this.$router.push({path:'/page1edit'})
    }
  }
};
</script>
<style lang="scss" scoped>

</style>

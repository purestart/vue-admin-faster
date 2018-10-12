/*
* author:詹陈龙
* description:菜单管理 列表
* update:2018-08-07
*/
<template>
  <div class="app-container">
    <div class="handle">
    <el-row>
      <el-button type="primary"  size="mini" @click="open"><i class="el-icon-plus"></i> 新增</el-button>
      <!-- <el-button type="primary"  size="mini" @click="open"><i class="el-icon-edit"></i> 编辑</el-button>
      <el-button type="primary"  size="mini" @click="open"><i class="el-icon-delete"></i> 删除</el-button>
      <el-button type="primary"  size="mini" @click="open"><i class="fa fa-key"></i> 授权</el-button>
      <el-button type="primary"  size="mini" @click="open"><i class="fa fa-key"></i> 授权查看</el-button> -->
    </el-row>
    </div>
    <div class="table-wrapper">
    <tree-table :data="sourceData" :evalFunc="func" :evalArgs="args" :typeName="typeName" :expandAll="expandAll" >
      <el-table-column label="组织编码">
        <template slot-scope="scope">
          <span style="color:sandybrown">{{scope.row.number}}</span>
          <!-- <el-tag>{{scope.row.timeLine+'ms'}}</el-tag> -->
        </template>
      </el-table-column>
     <!-- <el-table-column label="菜单Url">
        <template slot-scope="scope">
            <div>{{scope.row.Url}}</div>
        </template>
      </el-table-column> -->
      <el-table-column label="部门描述">
        <template slot-scope="scope">
            <div>{{scope.row.desc}}</div>
          <!-- <el-tooltip effect="dark" :content="scope.row.timeLine+'ms'" placement="left">
            <div class="processContainer">
              <div class="process" :style="{ width:scope.row._width * 500+'px',
              background:scope.row._width>0.5?'rgba(233,0,0,.5)':'rgba(0,0,233,0.5)',
              marginLeft:scope.row._marginLeft * 500+'px' }">
                <span style="display:inline-block"></span>
              </div>
            </div>
          </el-tooltip> -->
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="message(scope.row)">点击</el-button>
        </template>
      </el-table-column>
    </tree-table>
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


export default {
  name: 'Menus',
    components: {
    treeTable
  },
  data() {
    return {
      func: treeToArray,
      expandAll: false,
      typeName:"组织名称",
      dynamicTags: ["请至少选择一个数据项进行操作"],
      sourceData:
        {
          id: 1,
          name: '组织架构',
          Url:'/menus',
          timeLine: 100,
          number:"",
          desc:"组织架构",
          comment: '无',
          children: [
            {
              id: 2,
              name: '北京总公司',
              Url:'/menus',
              timeLine: 10,
              desc:"北京总公司",
              number:"1000",
              comment: '无',
              children: [
                {
                  id: 4,
                  name: '人事部',
                  Url:'/menus',
                  timeLine: 5,
                  desc:"北京总公司-人事部",
                  number:"1001",
                  comment: '无'
                },
                {
                  id: 5,
                  name: '技术部',
                  Url:'/menus',
                  timeLine: 10,
                   desc:"北京总公司-技术部",
                   number:"1002",
                  comment: '无'
                },
                {
                  id: 6,
                  name: '业务部',
                  Url:'/menus',

                  timeLine: 75,
                  comment: '无',
                   desc:"北京总公司-业务部",
                   number:"1003",
                  children:[]
                }
              ]
            },
            {
              id: 3,
              name: '广州分公司',
              Url:'/menus',
              timeLine: 90,
              comment: '无',
               desc:"广州分公司",
               number:"2000",
              children: [
                {
                  id: 4,
                  name: '人事部',
                  Url:'/menus',
                  timeLine: 5,
                  desc:"广州分公司-人事部",
                   number:"2001",
                  comment: '无'
                },
                {
                  id: 5,
                  name: '技术部',
                  Url:'/menus',
                  timeLine: 10,
                   desc:"广州分公司-技术部",
                   number:"2002",
                  comment: '无'
                },
                {
                  id: 6,
                  name: '业务部',
                  Url:'/menus',
                  timeLine: 75,
                  comment: '无',
                  desc:"广州分公司-业务部",
                  number:"2003",
                  children:[]
                }
              ]
            }
          ]
        },
      args:null,
    }
  },
  methods: {
    message(row) {
      this.$message.info(row.name)
    },
    open(){

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


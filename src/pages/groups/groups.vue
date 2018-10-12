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
      <el-button type="primary"  size="mini" @click="open"><i class="el-icon-edit"></i> 编辑</el-button>
      <el-button type="primary"  size="mini" @click="open"><i class="el-icon-delete"></i> 删除</el-button>
      <el-button type="primary"  size="mini" @click="open"><i class="fa fa-key"></i> 授权</el-button>
      <el-button type="primary"  size="mini" @click="open"><i class="fa fa-key"></i> 授权查看</el-button>
    </el-row>
    </div>
    <div class="table-wrapper">
    <tree-table :data="sourceData" :evalFunc="func" :evalArgs="args" :typeName="typeName" :expandAll="expandAll" >
      <el-table-column label="菜单编码">
        <template slot-scope="scope">
          <span style="color:sandybrown">{{scope.row.name}}</span>
          <!-- <el-tag>{{scope.row.timeLine+'ms'}}</el-tag> -->
        </template>
      </el-table-column>
            <el-table-column label="菜单Url">
        <template slot-scope="scope">
            <div>{{scope.row.Url}}</div>
        </template>
      </el-table-column>
      <el-table-column label="菜单描述">
        <template slot-scope="scope">
            <div>{{scope.row.timeLine}}</div>
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
      typeName:"菜单名称",
      dynamicTags: ["请至少选择一个数据项进行操作"],
      sourceData:
        {
          id: 1,
          name: '菜单管理',
          Url:'/menus',
          timeLine: 100,
          comment: '无',
          children: [
            {
              id: 2,
              name: '主页',
              Url:'/menus',
              timeLine: 10,
              comment: '无'
            },
            {
              id: 3,
              name: '应用实例维护',
              Url:'/menus',
              timeLine: 90,
              comment: '无',
              children: [
                {
                  id: 4,
                  name: '菜单管理',
                  Url:'/menus',
                  timeLine: 5,
                  comment: '无'
                },
                {
                  id: 5,
                  name: '功能管理',
                  Url:'/menus',
                  timeLine: 10,
                  comment: '无'
                },
                {
                  id: 6,
                  name: '事件6',
                  Url:'/menus',
                  timeLine: 75,
                  comment: '无',
                  children: [
                    {
                      id: 7,
                      name: '事件7',
                      Url:'/menus',
                      timeLine: 50,
                      comment: '无',
                      children: [
                        {
                          id: 71,
                          name: '事件71',
                          Url:'/menus',
                          timeLine: 25,
                          comment: 'xx'
                        },
                        {
                          id: 72,
                          name: '事件72',
                          Url:'/menus',
                          timeLine: 5,
                          comment: 'xx'
                        },
                        {
                          id: 73,
                          name: '事件73',
                          Url:'/menus',
                          timeLine: 20,
                          comment: 'xx'
                        }
                      ]
                    },
                    {
                      id: 8,
                      name: '事件8',
                      Url:'/menus',
                      timeLine: 25,
                      comment: '无'
                    },
                     {
                      id: 81,
                      name: '事件8',
                      Url:'/menus',
                      timeLine: 25,
                      comment: '无'
                    },
                    {
                      id: 82,
                      name: '事件8',
                      Url:'/menus',
                      timeLine: 25,
                      comment: '无'
                    },
                    {
                      id: 83,
                      name: '事件8',
                      Url:'/menus',
                      timeLine: 25,
                      comment: '无'
                    },
                                        {
                      id: 84,
                      name: '事件8',
                      Url:'/menus',
                      timeLine: 25,
                      comment: '无'
                    }
                  ]
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


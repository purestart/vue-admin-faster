<template>
    <div class="gen-list-container">
        <div class="search-box">
            
            <div class="input-item">
                    <span class="label">表名：</span>
                    <el-input v-model="query.name" placeholder="按表名查询" class="inline-input" size="small">
                    </el-input>
            </div>

        </div>
        <div class="tool-bar">
            <el-button type="primary" @click="newItem()" size="mini"><i class="el-icon-plus"></i> 新增</el-button>
            <el-button type="primary" @click="importDialogVisible=true" size="mini"><i class="el-icon-download"></i> 数据库导入表单</el-button>
            <el-button type="primary" @click="generatorCode"  size="mini"><i class="el-icon-document"></i> 生成代码</el-button>
            <el-button type="primary"  size="mini"><i class="el-icon-tickets"></i> 创建菜单</el-button>
             <el-button type="primary"  size="mini"><i class="el-icon-refresh"></i> 刷新</el-button>
             <el-button @click="searchByQuery()" type="primary"  style="float:right" size="mini" ><i class="el-icon-search"></i> 查询</el-button>
        </div>
        <div class="table-container">
            <el-table
                ref="singleTable"
                :data="genTable.list"
                size="small"
                highlight-current-row
                border
                stripe
                @selection-change="handleSelectionChange"
                >
                <el-table-column
                type="selection"
                width="55">
                </el-table-column>

                <el-table-column
                prop="name"
                label="表名"
                >
                </el-table-column>

                <el-table-column
                
                label="表类型"
                width="120">
                 <template slot-scope="scope">
                     <span>
                         {{typeEmun[scope.row.type]}}
                     </span>
                 </template>
                </el-table-column>


                <el-table-column
                prop="remarks"
                label="注释"
                >
                </el-table-column>

                <el-table-column
                prop="parent_table"
                label="主表"
                >
                </el-table-column>

                <el-table-column
                prop="db_name"
                label="所在数据库"
                >
                </el-table-column>


                
                <el-table-column
                prop="sync"
                label="同步数据库"
                >
                  <template slot-scope="scope">
                        <span >
                            {{syncEmun[scope.row.sync]}}
                        </span>
                    </template>
                </el-table-column>

                <el-table-column label="操作" width="200">
                    <template slot-scope="scope">

                        <a @click="editItem(scope.row)" href="javascript:void(0)">修改</a>
                        <span class="division">|</span>
                        <a @click="deleteItem(scope.row)" href="javascript:void(0)">删除</a>
                        <span class="division">|</span>
                        <a @click="syncDb(scope.row)" href="javascript:void(0)">更新到数据库</a>

                    </template>
                </el-table-column>

            </el-table>
        </div>

        <div class="pagination-wrpper">
            <el-pagination
            
            @current-change="handleCurrentChange"
            :current-page="genTable.pageNum"
            :page-sizes="[10, 15, 20, 25]"
            :page-size="genTable.pageSize"
            layout="total, prev, pager, next"
            :background="true"
            :total="genTable.total">
            </el-pagination>
        </div>

        <EditGenModel @updated="updateTableList" :table="currentItem" :visible="editDialogVisible" :beforeClose="beforeClose" />
        <ImportModel :modelVisible="importDialogVisible" @submit="updateTableList" @close="()=>importDialogVisible=false"></ImportModel>
    </div>
</template>

<script type='text/ecmascript-6'>
 import EditGenModel from "./editGenModel.vue";
 import { mapActions, mapState } from "vuex";
 import genTableApi from '../../api/gen-table-api.js';
 import genApi from '../../api/gen.js';
 import ImportModel from './importModel.vue';

  export default {
    components:{
        EditGenModel,
        ImportModel
    },
    data () {
      return {
        editDialogVisible:false,
        importDialogVisible:false,
        multipleSelection:[],
        query:{
            name:""
        },
        typeEmun:{
            single:"单表",
            main:"主表"
        },
        syncEmun:{
            0:"未同步",
            1:"已同步"
        },
        currentPage:1,
        genTable:{
            pageSize:10,
            pageNum:1,
            total:0,
            list:[]
        },
        currentItem:{},
      }
    },
    computed: {
        ...mapState({
            dataBases:state=>state.genStore.dataBases,
        }),
  },
    created () {
    },
    mounted () {
        this.fetchGenTableList();
    },
    methods:{
        generatorCode(){
            console.log(this.multipleSelection);
            if(this.multipleSelection.length==0){
                this.$message({
                    type: 'warning',
                    message: '请选择一张表!'
                });
                return ;
            }
            if(this.multipleSelection.length>1){
                 this.$message({
                    type: 'warning',
                    message: '最多只能选择一张表!'
                });
                return ;
            }

            let params={
                table:this.multipleSelection[0]
            }
            genTableApi.generateCode((res)=>{
                console.log(res);
                if(res.data.success==1 && res.data.data.ret.success==1){
                    this.$message({
                        type: 'success',
                        message: '生成代码成功!'
                    });
                }
            },err=>console.log(err),params);
        },
        syncDb(row){
            console.log(row);
            let attrs=JSON.parse(row.attrs);
            console.log(attrs);

            this.$confirm('若该表存在此操作将清空该表所有数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    genApi.syncDb((res)=>{
                        console.log("syncDb");
                        console.log(res);
                        if(res.data.success==1){
                           this.$message({
                                type: 'success',
                                message: '同步成功!'
                            });
                        }
                        this.fetchGenTableList();
                    },err=>console.log(err),{id:row.id,name:row.name,remarks:row.remarks,attrs:attrs,db_id:row.db_id});
                }).catch(() => {
                })


        },
        handleSelectionChange(val){
            this.multipleSelection = val;
        },
        searchByQuery(){
            this.fetchGenTableList({pageNum:1,name:this.query.name});
        },
        deleteItem(item){
            console.log(item);
            this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    let params={
                        id:item.id
                    }
                    genTableApi.deleteGenTableById((res)=>{
                        if(res.data.success==1){
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.fetchGenTableList({pageNum:this.genTable.pageNum,pageSize:this.genTable.pageSize});
                        }else{
                            this.$message({
                                type: 'success',
                                message: '删除失败!'
                            });
                        }
                    },err=>console.log(err),params);

                }).catch(() => {
                    // this.$message({
                    // type: 'success',
                    // message: '删除失败!'
                    // });
                });
        },
        updateTableList(){
            this.fetchGenTableList({pageNum:this.genTable.pageNum,pageSize:this.genTable.pageSize});
            this.editDialogVisible=false;
            this.importDialogVisible=false;
        },
        editItem(item){
            let str=JSON.stringify(item);
            let obj=JSON.parse(str);

            obj.editAttrs=JSON.parse(obj.attrs);
            if(obj.buttons){

                obj.editButtons=JSON.parse(obj.buttons);
            }else{
                obj.editButtons=[];
            }

            this.currentItem=obj;
            this.editDialogVisible=true;
        },
        handleCurrentChange(pageNum){
            this.fetchGenTableList({pageNum})
        },
        fetchGenTableList(payload={pageNum:1,pageSize:10}){
            console.log(payload);
            let params={
                pageNum:payload.pageNum,
                pageSize:payload.pageSize,
                name:payload.name
            };
            genTableApi.getGenTableList((res)=>{
                if(res.data.success){

                    this.genTable=res.data.data;
                }
            },err=>console.log(err),params);
        },
        newItem(){
            let obj={
                attrs:"[]",
                editAttrs:[],
                editButtons:['query','new','edit','delete','import','export'],
                buttons:"['query','new','edit','delete','import','export']"
            }
            this.currentItem=obj;
            this.editDialogVisible=true;
        },
        beforeClose(){
            this.editDialogVisible=false;
        }
    }
  }
</script>

<style lang='scss' scoped>
    .gen-list-container{
      margin: 16px;
      background-color: #ffffff;
      padding: 16px;
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
      .table-container{
          margin-top: 16px;
      }
      .pagination-wrpper{
          margin-top: 16px;
          text-align: right;
      }
    }
</style>
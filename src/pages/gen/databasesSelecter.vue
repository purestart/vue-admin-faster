<template>
<edit-model title="选择所在数据库" :modelVisible="modelVisible" @submit="submitForm" @close="onClose">
    <div class="databases--container">
       <div class="search-box">
            <div class="input-item">
                    <span class="label">数据库名称：</span>
                    <el-input v-model="query.name" placeholder="按数据库名称查询" class="inline-input" size="small">
                    </el-input>
            </div>
        </div>
        <div class="tool-bar">
            &nbsp;
            <!-- <el-button @click="newItem()" type="primary"  size="mini"><i class="el-icon-plus"></i> 新增</el-button> -->
            <el-button @click="searchByQuery()" type="primary"  style="float:right" size="mini" ><i class="el-icon-search"></i> 查询</el-button>
        </div>
        <div class="table-container">
            <el-table
                ref="singleTable"
                :data="dataBases.list"
                size="small"
                highlight-current-row
                border
                stripe
                @row-click="selectRow"
                >

                 <el-table-column label="选择" width="180">
                    <template slot-scope="scope">
                        <el-radio @change.native="getCurrentRow(scope.$index,scope.row)" :label="scope.row.id" v-model="itemId" class="textRadio">&nbsp;</el-radio>
                        
                    </template>
                 </el-table-column>
                <el-table-column
                prop="name"
                label="数据库名称"
                width="120">
                </el-table-column>

                <el-table-column
                prop="alias"
                label="别名"
                >
                </el-table-column>

                <el-table-column
                prop="type"
                label="类型"
                >
                </el-table-column>

                <!-- <el-table-column
                prop="host"
                label="地址"
                >
                </el-table-column> -->

                <el-table-column
                prop="remarks"
                label="备注"
                >
                </el-table-column>

                <!-- <el-table-column label="操作" width="180">
                    <template slot-scope="scope">

                        <a @click="editItem(scope.row)" href="javascript:void(0)">编辑</a>
                        <span class="division">|</span>

                        <a @click="deleteItem(scope.row)" href="javascript:void(0)">删除</a>

                    </template>
                </el-table-column> -->

            </el-table>
        </div>

        <div class="pagination-wrpper">
            <el-pagination
            
            @current-change="handleCurrentChange"
            :current-page="dataBases.pageNum"
            :page-sizes="[10, 15, 20, 25]"
            :page-size="dataBases.pageSize"
            layout="total, prev, pager, next"
            :background="true"
            :total="dataBases.total">
            </el-pagination>
        </div>


        <edit-model @submit="saveItem()" title="我的标题" :modelVisible="editModelVisible" @close="editModelVisible=false">
            <div class="edit-content">
                <el-form size="small" :model="formData" label-width="110px">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item   class="text-width" label="数据库名称">
                                <el-input  v-model="formData.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">

                            <el-form-item   class="text-width" label="数据库别名">
                                <el-input  v-model="formData.alias"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="12">
                            <el-form-item   class="text-width" label="类型">
                                <el-select @focus="adjustSelectWidth" style="width:99.9%;" v-model="formData.type" placeholder="请选择类型">
                                    <el-option label="MySql" value="MySql"></el-option>
                                    <el-option label="Oracle" value="Oracle"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                        <el-form-item class="text-width"  label="数据库地址">
                            <el-input  v-model="formData.host"></el-input>
                        </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="12">
                            <el-form-item   class="text-width"  label="用户名">
                                <el-input  v-model="formData.user"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item  class="text-width"  label="密码">
                                <el-input  type="password" v-model="formData.password"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="12">
                            <el-form-item   class="text-width"  label="端口">
                                <el-input  v-model="formData.port"></el-input>
                            </el-form-item>
                        </el-col>

                    </el-row>

                    <el-row>
                        <el-col :span="24">

                            <el-form-item class="text-width" label="描述">
                                <el-input  type="textarea" v-model="formData.remarks"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                </el-form>

            </div>
        </edit-model>

    </div>
</edit-model>
</template>

<script type='text/ecmascript-6'>
 import { mapActions, mapState } from "vuex";
 import genApi from '../../api/gen.js';

  export default {
      props:{
          modelVisible:{
              type:Boolean,
              required:false,
              default:false
          }
      },
    data () {
      return {
         editModelVisible:false,
         itemId:"",
         selectItem:{id:0,name:""},
         query:{
             name:""
         },
         formData:{
             id:0,
             name:"mydb",
             type:"mysql",
             host:"192.168.0.1"
         },
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
        
    },
    watch:{
        modelVisible(cur,old){
            if(cur==true){
                this.fetchDbList({pageNum:1,pageSize:10});
            }
        }
    },
    methods:{
        ...mapActions(["fetchDbList",]),

        submitForm(){
            this.$emit("submit",this.selectItem);
        },
        onClose(){
            this.$emit("close",false);
        },
        getCurrentRow(index,row){
            console.log(row);
            this.selectItem=row;
        },
        selectRow(row){
            //console.log(row);
            this.selectItem=row;
            this.itemId=this.selectItem.id;
        },
        adjustSelectWidth(e){
            e.target.parentNode.parentNode.style.width="100%";
        },
        searchByQuery(){
            this.fetchDbList({pageNum:1,name:this.query.name});
        },
        handleCurrentChange(val){
            this.fetchDbList({pageNum:val});
        },
        saveItem(){
            console.log(this.formData);
            if(this.formData.id){

                genApi.updateDb((res)=>{
                    console.log("updateDb success");
                    console.log(res);
                    this.editModelVisible=false;
                    this.fetchDbList({pageNum:this.dataBases.pageNum,pageSize:this.dataBases.pageSize});
                },err=>console.log(err),this.formData);
            }else{
                 genApi.createDb((res)=>{
                    console.log("createDb success");
                    console.log(res);
                    this.editModelVisible=false;
                    this.fetchDbList({pageNum:this.dataBases.pageNum,pageSize:this.dataBases.pageSize});
                },err=>console.log(err),this.formData);
            }

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
                    genApi.deleteDbById((res)=>{
                        if(res.data.success==1){
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.fetchDbList({pageNum:this.dataBases.pageNum,pageSize:this.dataBases.pageSize});
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
        editItem(item){
            let str=JSON.stringify(item);
            this.formData=JSON.parse(str);
            this.editModelVisible=true;
        },
        newItem(){
            this.formData={};
            this.editModelVisible=true;
        }
    }
  }
</script>

<style lang='scss' scoped>
    .databases--container{
      margin: 16px;
      background-color: #ffffff;
      position: relative;
      padding: 16px;
      min-height: 600px;
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
        .tool-bar{
            padding-bottom: 0px;
            min-height: 28px;
        }
      .table-container{
          margin-top: 16px;
      }
      .pagination-wrpper{
          padding-top:16px;
          text-align: right;
      }
      .edit-content{
          padding: 16px;
      }
      
    }
</style>
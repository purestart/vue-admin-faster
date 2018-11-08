/*
* author:詹陈龙
* description: 角色权限弹出框
* update:2018-08-07
*/
<template>
    <div>
       <!-- <el-dialog
        title="新增表单"
        :visible.sync="visible"
        width="70%"
        :before-close="beforeClose"
        top="0"
        > -->
        <edit-model :width="1200" :height="700" @submit="sumitForm()" title="我的标题" :modelVisible="visible" @close="beforeClose">
        
        <div class="dialog-container">
            <!-- <el-tree
            v-loading="loading"
            :data="menusData"
            show-checkbox
            node-key="id"
            :default-expanded-keys="[2, 3]"
            :default-checked-keys="[5]"
            :props="defaultProps">
            </el-tree> -->
            <div style="border-top:1px solid #e4e4e4;" class="info-box">
              <div class="left-wraper">
                <div class="form-item">
                  <div class="label">
                    <span>*表名：</span>
                  </div>
                  <div class="input-box">
                    <el-input v-model="tableData.name"></el-input>
                  </div>
                </div>
              </div>
              <div class="right-wraper">
                <div class="form-item">
                  <div class="label">
                    <span>*说明：</span>
                  </div>
                  <div class="input-box">
                    <el-input v-model="tableData.remarks"></el-input>
                  </div>
                </div>
              </div>
            </div>
            <div class="info-box">
              <div class="left-wraper">
                <div class="form-item">
                  <div class="label">
                    <span>*表类型：</span>
                  </div>
                  <div class="input-box">
                    <el-select @focus="adjustSelectWidth" v-model="tableData.type" style="width:99.9%;" placeholder="请选择">
                          <el-option
                          v-for="item in typeList"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id">
                        </el-option>
                          <!-- <el-option
                          label="单表"
                          value="single">
                          </el-option>
                          <el-option
                          label="主表"
                          value="main">
                          </el-option> -->
                      </el-select>
                  </div>
                </div>
              </div>
              <div class="right-wraper">
                <div class="form-item">
                  <div class="label">
                    <span>*模块名：</span>
                  </div>
                  <div class="input-box">
                    <el-input  v-model="tableData.module_name"></el-input>
                  </div>
                </div>
              </div>
            </div>


            <div class="info-box">
              <div class="left-wraper">
                <div class="form-item">
                  <div class="label">
                    <span>所在数据库：</span>
                  </div>
                  <div class="input-box">
                    <el-input disabled v-model="tableData.db_name">
                      <el-button @click="selectDbInfo" type="success" slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                  </div>
                </div>
              </div>
              <div class="right-wraper">
                <div class="form-item">
                  <div class="label">
                    <span>类名：</span>
                  </div>
                  <div class="input-box">
                    <el-input v-model="tableData.class_name"></el-input>
                  </div>
                </div>
              </div>
            </div>

            <div class="info-box">
              <div class="left-wraper">

                <div class="form-item">
                  <div class="label">
                    <span>功能按钮：</span>
                  </div>
                  <div style="line-height: 35px;" class="input-box">
                    <!-- <el-input  v-model="tableData.parent_table"></el-input> -->
                    <el-checkbox-group v-model="tableData.editButtons" >
                      <el-checkbox style="margin-left: 15px;" v-for="btn in buttons" :label="btn.type" :key="btn.name">{{btn.name}}</el-checkbox>
                    </el-checkbox-group>
                  </div>
                </div>

              </div>
              <div class="right-wraper">
                <div class="form-item">
                  <div class="label">
                    <span>当前表外键：</span>
                  </div>
                  <div class="input-box">
                    <el-input v-model="tableData.parent_table_fk"></el-input>
                  </div>
                </div>
              </div>
            </div>

            <div class="btn-tool">
              <el-button type="primary" @click="addItem" size="mini"><i class="el-icon-plus"></i> 新增</el-button>
              <el-button type="primary" @click="deleteItem"  size="mini"><i class="el-icon-minus"></i> 删除</el-button>
            </div>

            <div class="tab-wraper">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                  <el-tab-pane label="数据库属性" name="first">
                    <DataBaseForm @selectionChange="selectionChange" :tableData="tableData.editAttrs" />
                  </el-tab-pane>
                  <el-tab-pane label="页面属性" name="second">
                    <PageProForm @selectionChange="selectionChange" :tableData="tableData.editAttrs"/>
                  </el-tab-pane>
                  <el-tab-pane label="页面校验" name="third">
                    <PageCheckForm @selectionChange="selectionChange" :tableData="tableData.editAttrs" />
                  </el-tab-pane>
                  <el-tab-pane label="grid选择框（自定义java对象）" name="fourth">
                    <GridTableForm @selectionChange="selectionChange" :tableData="tableData.editAttrs" />
                  </el-tab-pane>
                </el-tabs>
            </div>

        </div>
        </edit-model>

        <!-- <span slot="footer" class="dialog-footer">
            <el-button size="mini" type="primary" @click="sumitForm">确 定</el-button>
            <el-button size="mini" @click="beforeClose">取 消</el-button>
        </span>
        </el-dialog> -->



          <databasesSelecter :modelVisible="dbModelVisible" @close="dbModelVisible=false" @submit="submitDbSelectForm"></databasesSelecter>



    </div>
</template>

<script type='text/ecmascript-6'>
import DataBaseForm from "./editForms/dataBaseForm";
import PageProForm from "./editForms/pageProForm.vue";
import PageCheckForm from './editForms/pageCheckForm';
import GridTableForm from './editForms/gridTableForm';
import genTableApi from '../../api/gen-table-api.js';

import databasesSelecter from "./databasesSelecter.vue";

  export default {
    components:{
      DataBaseForm,
      PageProForm,
      PageCheckForm,
      GridTableForm,
      databasesSelecter
    },
    props: {
        visible:Boolean,
        beforeClose:Function,
        table:Object
    },
    data () {
      return {
          typeList:[],
          loading:false,
          dbModelVisible:false,
          activeName:"first",
          module:{
            type:"single"
          },
          tableData:{
            attrs:[],
            buttons:[]
          },
          buttons:[
            {
              type:'query',
              name:'查询'
            },
            {
              type:'new',
              name:'新增'
            },
            {
              type:'edit',
              name:'修改'
            },
            {
              type:'delete',
              name:'删除'
            },
            {
              type:'import',
              name:'导入'
            },
            {
              type:'export',
              name:'导出'
            }
          ],
          multiSelect:[],
      }
    },
    watch:{
      table(curVal,oldVal){
        if(!curVal.buttons){
            curVal.buttons=[];
        }
        this.tableData=curVal;
        if(this.typeList.length==0){
          this.getGenTypeList();
        }
      }
      // visible(curVal,oldVal){
      //   console.log(curVal);
      //   if(curVal==false){
      //     this.loading=false;
      //   }else{
      //     this.loading=true;
      //   setTimeout(()=>{
      //     this.loading=false;
      //   },2000)
      //   }
      // },
    },
    computed:{
    },
    created () {
      
    },
    mounted () {
      // this.loading=true;
      //   setTimeout(()=>{
      //     this.loading=false;
      //   },2000)
    },
    methods:{
      getGenTypeList () {
            this.$axios.get(
            `${this.$baseUrl}/gen/tb-gen-type/list`,
            {
                params: {
                    'pageNum': 1,
                    'pageSize': 100,
                    'query': {}
                }
            }
            ).then(({data}) => {
            if (data && data.success == 1) {
                this.typeList = data.data.list
                
            } else {
                this.typeList = []
                
            }
            
            })
        },
      handleClick(){},
      selectionChange(val){
        this.multiSelect=val;
      },
      deleteItem(){
        if(this.multiSelect.length>1){
          this.$message({
            type:"error",
            message: '只能删除一行!'
          });
          return;
        }
        let ids=[];
        this.tableData.editAttrs.forEach((item,index)=>{
          this.multiSelect.forEach((selectItem)=>{
            if(item.name==selectItem.name){
              ids.push(index);
            }
          })
        })
        ids.forEach((idx)=>{
          this.tableData.editAttrs.splice(idx,1);
        })
      },
      submitDbSelectForm(selectDb){
        console.log(selectDb);
        this.dbModelVisible=false;
        this.tableData.db_name=selectDb.name;
        this.tableData.db_id=selectDb.id;

      },
      adjustSelectWidth(e){
       
        e.target.parentNode.parentNode.style.width="100%";
      },
      addItem(){
        let item={};
        this.tableData.editAttrs.push(item);
      },
      selectDbInfo(){
        console.log("selectDbInfo");
        this.dbModelVisible=true;
      },
      sumitForm(){
        this.tableData.buttons=JSON.stringify(this.tableData.editButtons);
        console.log(this.tableData);
        this.tableData.attrs=JSON.stringify(this.tableData.editAttrs);
        if(this.tableData.id){
          genTableApi.updateGenTable((res)=>{
            this.$emit("updated",false)
          },err=>console.log(err),this.tableData)
        }else{
          genTableApi.createGenTable((res)=>{
            this.$emit("updated",false)
          },err=>console.log(err),this.tableData)
        }
      }
    }
  }
</script>

<style lang='scss' scoped>
  .dialog-container{
    position: relative;
    height: 600px;
    overflow: auto;
    padding: 16px;
    color: #333;
    .info-box{
      display: -ms-flexbox;
      display: -moz-box;
      display:-webkit-box;
      display: -webkit-flex;
      display: flex;
      border-bottom: 1px solid #e4e4e4;
      box-sizing: border-box;
      .left-wraper{
        -moz-box-flex:1;
        box-flex:1;
        -webkit-box-flex:1;
        -webkit-flex:1;
        flex:1;
        .form-item{
          display: -ms-flexbox;
          display: -moz-box;
          display:-webkit-box;
          display: -webkit-flex;
          display: flex;
          

          .label{
            min-width: 150px;
            text-align: right;
            background-color: #f0f2f5;
            line-height: 60px;
            padding-right: 5px;
            font-size: 14px;
            
          }
                    .input-box{
            -moz-box-flex:1;
            box-flex:1;
            -webkit-box-flex:1;
            -webkit-flex:1;
            flex:1;
            padding: 10px;
          }
        }

      }
      .right-wraper{
        -moz-box-flex:1;
        box-flex:1;
        -webkit-box-flex:1;
        -webkit-flex:1;
        flex:1;
        .form-item{
          display: -ms-flexbox;
          display: -moz-box;
          display:-webkit-box;
          display: -webkit-flex;
          display: flex;
          .label{
            min-width: 150px;
            text-align: right;
            background-color: #f0f2f5;
            line-height: 60px;
            padding-right: 5px;

            
          }
          .input-box{
            -moz-box-flex:1;
            box-flex:1;
            -webkit-box-flex:1;
            -webkit-flex:1;
            flex:1;
            padding: 10px;
          }
        }
      }
    }

    .btn-tool{
      padding: 10px 0px;
    }


  }
</style>
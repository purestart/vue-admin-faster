<template>
    <edit-model title="选择要导入的数据表" :modelVisible="modelVisible" @submit="submitForm" @close="onClose">
        <div class="import-wraper">
            <div class="db-list">
                <div :class="currentDb.id==item.id?'active':''" @click="changeItem(item)" :key="item.id" v-for="item in dbList" class="db-item">
                   {{item.alias}}--{{item.name}}
                </div>
            </div>
            <div class="table-list">
                <div :class="selectedTable.tableName==item.tableName?'active':''" @click="changeTable(item)" :key="index" v-for="(item,index) in tables" class="table-item">
                    {{item.tableName}}
                </div>
            </div>
        </div>
    </edit-model>
</template>

<script type='text/ecmascript-6'>
  import genApi from "../../api/gen.js";
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
          dbList:[],
          currentDb:{},
          tables:[],
          selectedTable:{},
      }
    },
    created () {
    },
    mounted () {

    },
    watch:{
        modelVisible(cur,old){
           
            if(cur==true){
                //获取数据库列表
                 this.getDbList();
            }
        }
    },
    methods:{
        changeTable(item){
            this.selectedTable=item;
            
        },
        changeItem(item){
            this.currentDb=item;
            this.showTables(item);
            this.selectedTable={};
        },
        submitForm(){

            if(this.selectedTable.tableName){
                this.createGenByTable();
            }else{
                this.$message({
                    type: 'warning',
                    message: '请选择数据表!'
                });
            }

        },
        createGenByTable(){
            let params={
                database:this.currentDb,
                table:this.selectedTable
            }
            genApi.createGenByTable((res)=>{
                console.log("createGenByTable");
                console.log(res);
                if(res.data.success){
                    this.$emit("submit",false);
                }
            },err=>console.log(err),params);
        },
        onClose(){
            this.$emit("close",false);
        },
        getDbList(){
            let params={
                pageNum:1,
                pageSize:20
            }
            genApi.getDbList((res)=>{
                console.log("getDbList");
                console.log(res);
                if(res.data.success){
                    this.dbList=res.data.data.list;
                }
            },err=>console.log(err),params);
        },
        showTables(item){
            let params={
                id:item.id
            }
            genApi.showTables((res)=>{
                console.log("showTables");
                console.log(res);
                if(res.data.success){
                    this.tables=res.data.data;
                }
            },err=>console.log(err),params);
        }
    }
  }
</script>

<style lang='scss' scoped>
    .import-wraper{
        display: -ms-flexbox;
        display: -moz-box;
        display:-webkit-box;
        display: -webkit-flex;
        display: flex;
        padding: 16px;
        .db-list{
            -moz-box-flex:1;
            box-flex:1;
            -webkit-box-flex:1;
            -webkit-flex:1;
            flex:1;
            border: 1px solid #e4e4e4;
            height: 500px;
            overflow: scroll;
            .db-item{
                padding: 10px;
                border-bottom: 1px solid #e4e4e4;
                &:hover{
                    background-color: #f2f2f2;
                }
                &.active{
                    background-color: #e4e4e4;
                }
            }
        }
        .table-list{
            -moz-box-flex:1;
            box-flex:1;
            -webkit-box-flex:1;
            -webkit-flex:1;
            flex:1;
            margin-left: 16px;
            border: 1px solid #e4e4e4;
            height: 500px;
            overflow: scroll;
            
            .table-item{
                padding: 10px;
                border-bottom: 1px solid #e4e4e4;
                &:hover{
                    background-color: #f2f2f2;
                }
                &.active{
                    background-color: #e4e4e4;
                }
            }

        }

    }
</style>
<template>
    <div>
         <el-table
                        
            :data="tableData"
            size="small"
            highlight-current-row
            border
            stripe
            @selection-change="selectionChangeHandle"
            >

            <el-table-column
            type="selection"
            width="55">
            </el-table-column>

            <el-table-column label="列名"  prop="name"   header-align="center">
                <template slot-scope="{row,$index}">
                    <el-input class="edit-cell" disabled   v-model="row.name"></el-input>
                    
                </template>
            </el-table-column>

            <el-table-column label="说明"  prop="remarks"  header-align="center">
                <template slot-scope="{row,$index}">
                    <el-input class="edit-cell"  disabled   v-model="row.remarks"></el-input>
                    
                </template>
            </el-table-column>


            <el-table-column label="Table表名"  prop="tableName"  header-align="center">
                <template slot-scope="{row,$index}">
                   <el-input class="edit-cell"    v-model="row.tableName"></el-input>
                    
                </template>
            </el-table-column>

                        <el-table-column label="JAVA属性说明"  prop="javaPropDesc"  header-align="center">
                <template slot-scope="{row,$index}">
                   <el-input class="edit-cell"    v-model="row.javaPropDesc"></el-input>
                    
                </template>
            </el-table-column>

                        <el-table-column label="JAVA属性名称"   prop="javaPropName"  header-align="center">
                <template slot-scope="{row,$index}">
                   <el-input class="edit-cell"    v-model="row.javaPropName"></el-input>
                    
                </template>
            </el-table-column>

                <el-table-column label="检索标签"   prop="searchLabel"  header-align="center">
                <template slot-scope="{row,$index}">
                   <el-input class="edit-cell"    v-model="row.searchLabel"></el-input>
                    
                </template>
            </el-table-column>

             <el-table-column label="检索key" prop="searchKey"  header-align="center">
                <template slot-scope="{row,$index}">
                   <el-input class="edit-cell"    v-model="row.searchKey"></el-input>
                    
                </template>
            </el-table-column>



        </el-table>
    </div>
</template>

<script type='text/ecmascript-6'>
  export default {
    props:[
        'tableData'
    ],
    data () {
      return {
           javaTypeOptions: [{
            value: 'String',
            label: 'String'
            }, {
            value: 'Long',
            label: 'Long'
            }, {
            value: 'Integer',
            label: 'Integer'
            }, {
            value: 'Double',
            label: 'Double'
            }, {
            value: 'Date',
            label: 'Date'
            }],
      }
    },
    created () {
    },
    mounted () {

    },
    methods:{
        selectionChangeHandle(val){
            this.$emit("selectionChange",val);
        },
    }
  }
</script>

<style lang='scss' scoped>

</style>
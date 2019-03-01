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
                    <el-input class="edit-cell"  disabled   v-model="row.name"></el-input>
                    
                </template>
            </el-table-column>

            <el-table-column label="说明"  prop="remarks"  header-align="center">
                <template slot-scope="{row,$index}">
                    <el-input class="edit-cell"  disabled   v-model="row.remarks"></el-input>
                    
                </template>
            </el-table-column>

            <!-- <el-table-column label="java类型"  prop="javaType"  header-align="center">
                <template slot-scope="{row,$index}">
                        <el-select v-model="row.javaType" placeholder="请选择">
                            <el-option
                            v-for="item in javaTypeOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                </template>
            </el-table-column> -->

            <el-table-column label="java属性名称"  prop="propName"  header-align="center">
                <template slot-scope="{row,$index}">
                    <el-input class="edit-cell"     v-model="row.propName"></el-input>
                    
                </template>
            </el-table-column>


            <el-table-column label="表单" width="50"  prop="existForm"  header-align="center">
                <template slot-scope="{row,$index}">
                    <div style="text-align:center">

                    <el-checkbox v-model="row.existForm"></el-checkbox>
                    </div>
                    
                </template>
            </el-table-column>
                        <el-table-column label="列表" width="50"  prop="existList"  header-align="center">
                <template slot-scope="{row,$index}">
                    <div style="text-align:center">

                    <el-checkbox v-model="row.existList"></el-checkbox>
                    </div>
                    
                </template>
            </el-table-column>
                        <el-table-column label="查询" width="50"  prop="existSearch"  header-align="center">
                <template slot-scope="{row,$index}">
                    <div style="text-align:center">

                    <el-checkbox v-model="row.existSearch"></el-checkbox>
                    </div>
                    
                </template>
            </el-table-column>

            
            <el-table-column label="高级查询" width="80"  prop="existAdvanceSearch"  header-align="center">
                <template slot-scope="{row,$index}">
                    <div style="text-align:center">

                    <el-checkbox v-model="row.existAdvanceSearch"></el-checkbox>
                    </div>
                    
                </template>
            </el-table-column>

            <el-table-column label="查询匹配方式"  prop="searchType"  header-align="center">
                <template slot-scope="{row,$index}">
                        <el-select v-model="row.searchType" placeholder="请选择">
                            <el-option
                            v-for="item in searchTypes"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                </template>
            </el-table-column>

                <el-table-column label="显示表单类型"  prop="formItemType"  header-align="center">
                <template slot-scope="{row,$index}">
                        <el-select v-model="row.formItemType" placeholder="请选择">
                            <el-option
                            v-for="item in formType"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    
                </template>
            </el-table-column>

           <el-table-column label="字典类型"   prop="dict"  header-align="center">
                <template slot-scope="{row,$index}">
                    <el-input class="edit-cell"     v-model="row.dict"></el-input>
                </template>
            </el-table-column>


            <!-- <el-table-column label="操作" width="180">
                <template slot-scope="scope">
                    <a href="/">编辑</a>
                    <span class="division">|</span>
                    <a href="/">删除</a>
                    <span class="division">|</span>
                    <a @click.prevent="()=>centerDialogVisible=true" href="javascript:void(0)">菜单授权</a>
                </template>
            </el-table-column> -->

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
            formType:[{
                value: 'text',
                label: '单行文本'
            },{
                value: 'miltiText',
                label: '多行文本'
            },{
                value: 'select',
                label: '下拉选项'
            },{
                value: 'radio',
                label: '单选框'
            },{
                value: 'checkBox',
                label: '复选框'
            },{
                value: 'datetime',
                label: '日期选择'
            },{
                value: 'file',
                label: '文件上传选择'
            },{
                value: 'richtext',
                label: '富文本'
            },{
                value: 'number',
                label: '数字'
            },{
                value: 'counter',
                label: '计数器'
            }],
            searchTypes:[{
                value: '==',
                label: '=='
            },
            {
                value: '!=',
                label: '!='
            },
            {
                value: '>',
                label: '>'
            },
            {
                value: '>=',
                label: '>='
            },
            {
                value: '<',
                label: '<'
            },
            {
                value: '<=',
                label: '<='
            },
            {
                value: 'BetWeen',
                label: 'BetWeen'
            },
            {
                value: 'Like',
                label: 'Like'
            }]
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
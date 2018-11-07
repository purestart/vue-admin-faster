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


            <el-table-column label="可空" width="50"  prop="isEmpty"  header-align="center">
                <template slot-scope="{row,$index}">
                    <div style="text-align:center">

                    <el-checkbox v-model="row.isEmpty"></el-checkbox>
                    </div>
                    
                </template>
            </el-table-column>

            <el-table-column label="检验类型"  prop="checkType"  header-align="center">
                <template slot-scope="{row,$index}">
                        <el-select v-model="row.checkType" placeholder="请选择">
                            <el-option
                            v-for="item in checkTypes"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    
                </template>
            </el-table-column>


           <el-table-column label="最小长度"   prop="minLength"  header-align="center">
                <template slot-scope="{row,$index}">
                    <el-input class="edit-cell"     v-model="row.minLength"></el-input>
                </template>
            </el-table-column>
                       <el-table-column label="最大长度"   prop="maxLength"  header-align="center">
                <template slot-scope="{row,$index}">
                    <el-input class="edit-cell"     v-model="row.maxLength"></el-input>
                </template>
            </el-table-column>

           <el-table-column label="最小值"   prop="minValue"  header-align="center">
                <template slot-scope="{row,$index}">
                    <el-input class="edit-cell"     v-model="row.minValue"></el-input>
                </template>
            </el-table-column>
                       <el-table-column label="最大值"   prop="maxValue"  header-align="center">
                <template slot-scope="{row,$index}">
                    <el-input class="edit-cell"     v-model="row.maxValue"></el-input>
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
            checkTypes:[{
                value: 'email',
                label: '电子邮件'
            },{
                value: 'http',
                label: '网址'
            },{
                value: 'phone',
                label: '手机号'
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
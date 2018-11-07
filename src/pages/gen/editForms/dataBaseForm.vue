<template>
    <div>
        <el-table
                        
            :data="tableData"
            size="small"
            highlight-current-row
            border
            stripe
            
            >

            <el-table-column
            type="selection"
            width="55">
            </el-table-column>

            <el-table-column label="列名"  prop="name"   header-align="center">
                <template slot-scope="{row,$index}">
                    <el-input class="edit-cell"     v-model="row.name"></el-input>
                    
                </template>
            </el-table-column>

            <el-table-column label="说明"  prop="remarks"  header-align="center">
                <template slot-scope="{row,$index}">
                    <el-input class="edit-cell"     v-model="row.remarks"></el-input>
                    
                </template>
            </el-table-column>

            <el-table-column label="物理类型"  prop="dataType"  header-align="center">
                <template slot-scope="{row,$index}">
                        <el-select v-model="row.dataType" placeholder="请选择">
                            <el-option
                            v-for="item in dataTypeOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    
                </template>
            </el-table-column>


            <el-table-column label="主键" width="100"  prop="primaryKey"  header-align="center">
                <template slot-scope="{row,$index}">
                    <div style="text-align:center">

                        <el-checkbox v-model="row.primaryKey"></el-checkbox>
                    </div>
                    
                </template>
            </el-table-column>

            <el-table-column label="自增" width="100"  prop="isAutoIncrement"  header-align="center">
                <template slot-scope="{row,$index}">
                    <div style="text-align:center">

                        <el-checkbox v-model="row.isAutoIncrement"></el-checkbox>
                    </div>
                    
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

          dataTypeOptions: [{
            value: 'varchar(64)',
            label: 'varchar(64)'
            }, {
            value: 'varchar(128)',
            label: 'varchar(128)'
            }, {
            value: 'varchar(255)',
            label: 'varchar(255)'
            }, {
            value: 'integer',
            label: 'integer'
            }, {
            value: 'double',
            label: 'double'
            }, {
            value: 'datetime',
            label: 'datetime'
            }, {
            value: 'longblob',
            label: 'longblob'
            }, {
            value: 'longtext',
            label: 'longtext'
            }],
      }
    },
    created () {
    },
    mounted () {

    },
    methods:{

    }
  }
</script>

<style lang='scss' scoped>

</style>
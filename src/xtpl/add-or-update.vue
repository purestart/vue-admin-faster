<template>
  <el-dialog
    :title="!dataForm.${pk.attrname} ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
#foreach($column in $columns)
#if($column.columnName != $pk.columnName)
    <el-form-item label="${column.comments}" prop="${column.attrname}">
      <el-input v-model="dataForm.${column.attrname}" placeholder="${column.comments}"></el-input>
    </el-form-item>
#end
#end
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    data () {
      return {
        visible: false,
        dataForm: {
#foreach($column in $columns)
#if($column.columnName == $pk.columnName)
          ${column.attrname}: 0,
#else
          ${column.attrname}: ''#if($velocityCount != $columns.size()),#end

#end
#end
        },
        dataRule: {
#foreach($column in $columns)
#if($column.columnName != $pk.columnName)
          ${column.attrname}: [
            { required: true, message: '${column.comments}不能为空', trigger: 'blur' }
          ]#if($velocityCount != $columns.size()),#end

#end
#end
        }
      }
    },
    methods: {
      init () {
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.${pk.attrname}) {
            this.getInfo()
          }
        })
      },
      // 获取信息
      getInfo () {
      #[[this.$http.get]]#(`${window.SITE_CONFIG['baseURL']}/${moduleName}/${pathName}/info/#[[$]]#{this.dataForm.${pk.attrname}}`).then(({data}) => {
          if (data && data.code === 0) {
#foreach($column in $columns)
#if($column.columnName != $pk.columnName)
             this.dataForm.${column.attrname} = data.${pathName}.${column.attrname}
#end
#end
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        #[[this.$refs['dataForm'].validate((valid) => {]]#
          if (valid) {
          #[[this.$http.post(]]#
              `${window.SITE_CONFIG['baseURL']}/${moduleName}/${pathName}/${!this.dataForm.${pk.attrname} ? 'save' : 'update'}`,
              {
#foreach($column in $columns)
#if($column.columnName == $pk.columnName)
                '${column.attrname}': this.dataForm.${column.attrname} || undefined,
#else
                '${column.attrname}': this.dataForm.${column.attrname}#if($velocityCount != $columns.size()),#end

#end
#end
              }
            ).then(({data}) => {
              if (data && data.code === 0) {
                #[[this.$message({]]#
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.visible = false
                    #[[this.$emit('refreshDataList')]]#
                  }
                })
              } else {
                #[[this.$message.error(data.msg)]]#
              }
            })
          }
        })
      }
    }
  }
</script>

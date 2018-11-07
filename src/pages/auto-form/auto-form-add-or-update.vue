<template>
 <edit-model  @submit="dataFormSubmit()" title="我的标题" :modelVisible="visible" @close="closeModel">
    <el-form class="form-wrapper" :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">

    <el-form-item label="表单名称" prop="form_name">
      <el-input v-model="dataForm.form_name" placeholder="表单名称"></el-input>
    </el-form-item>

    <el-form-item label="表单描述" prop="form_desc">
      <el-input v-model="dataForm.form_desc" placeholder="表单描述"></el-input>
    </el-form-item>

    <el-form-item label="模板样式" prop="form_style_id">
      <el-input v-model="dataForm.form_style_id" placeholder="模板样式"></el-input>
    </el-form-item>

    <el-form-item label="表单编辑器文本" prop="form_content">
      <el-input v-model="dataForm.form_content" placeholder="表单编辑器文本"></el-input>
    </el-form-item>

    <el-form-item label="创建人名称" prop="create_name">
      <el-input v-model="dataForm.create_name" placeholder="创建人名称"></el-input>
    </el-form-item>

    <el-form-item label="创建人登录名称" prop="create_by">
      <el-input v-model="dataForm.create_by" placeholder="创建人登录名称"></el-input>
    </el-form-item>

    <el-form-item label="创建日期" prop="create_date">
      <el-input v-model="dataForm.create_date" placeholder="创建日期"></el-input>
    </el-form-item>

    <el-form-item label="更新人登录名称" prop="update_by">
      <el-input v-model="dataForm.update_by" placeholder="更新人登录名称"></el-input>
    </el-form-item>

    <el-form-item label="所属部门" prop="sys_org_code">
      <el-input v-model="dataForm.sys_org_code" placeholder="所属部门"></el-input>
    </el-form-item>

    <el-form-item label="所属公司" prop="sys_company_code">
      <el-input v-model="dataForm.sys_company_code" placeholder="所属公司"></el-input>
    </el-form-item>

    <el-form-item label="长文本" prop="form_parse">
      <el-input v-model="dataForm.form_parse" placeholder="长文本"></el-input>
    </el-form-item>

    <el-form-item label="主数据源" prop="main_table_source">
      <el-input v-model="dataForm.main_table_source" placeholder="主数据源"></el-input>
    </el-form-item>

    </el-form>
 </edit-model>
</template>

<script>
  export default {
    props:{
      visible:{
        type:Boolean,
        default:false
      }
    },
    data () {
      return {
        
        dataForm: {
          id: "",
          form_name: "",
          form_desc: "",
          form_style_id: "",
          form_content: "",
          create_name: "",
          create_by: "",
          create_date: "",
          update_by: "",
          update_date: "",
          sys_org_code: "",
          sys_company_code: "",
          form_parse: "",
          main_table_source: "",
          update_name: "",
          
        },
        dataRule: {
          form_name: [
                      { required: true, message: '表单名称不能为空', trigger: 'blur' }
                    ],
          form_content: [
                      { required: true, message: '表单编辑器文本不能为空', trigger: 'blur' }
                    ],
          
        }
      }
    },
    methods: {
      closeModel(){
        this.$emit("closeModel",false);
      },
      init () {
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            this.getInfo()
          }
        })
      },
      // 获取信息
      getInfo () {
        this.$axios.get(`${this.$baseUrl}/auto-form/auto-form/info/${this.dataForm.id}`).then(({data}) => {
          if (data && data.success === 1) {
          
             this.dataForm.form_name = data.data.form_name
             this.dataForm.form_desc = data.data.form_desc
             this.dataForm.form_style_id = data.data.form_style_id
             this.dataForm.form_content = data.data.form_content
             this.dataForm.create_name = data.data.create_name
             this.dataForm.create_by = data.data.create_by
             this.dataForm.create_date = data.data.create_date
             this.dataForm.update_by = data.data.update_by
             this.dataForm.update_date = data.data.update_date
             this.dataForm.sys_org_code = data.data.sys_org_code
             this.dataForm.sys_company_code = data.data.sys_company_code
             this.dataForm.form_parse = data.data.form_parse
             this.dataForm.main_table_source = data.data.main_table_source
             this.dataForm.update_name = data.data.update_name
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
           this.$axios.post(
              `${this.$baseUrl}/auto-form/auto-form/${!this.dataForm.id?'create':'update'}`,
              {
                
                      'id': this.dataForm.id,
                
                      'form_name': this.dataForm.form_name || undefined,
                
                      'form_desc': this.dataForm.form_desc || undefined,
                
                      'form_style_id': this.dataForm.form_style_id || undefined,
                
                      'form_content': this.dataForm.form_content || undefined,
                
                      'create_name': this.dataForm.create_name || undefined,
                
                      'create_by': this.dataForm.create_by || undefined,
                
                      'create_date': this.dataForm.create_date || undefined,
                
                      'update_by': this.dataForm.update_by || undefined,
                
                      'update_date': this.dataForm.update_date || undefined,
                
                      'sys_org_code': this.dataForm.sys_org_code || undefined,
                
                      'sys_company_code': this.dataForm.sys_company_code || undefined,
                
                      'form_parse': this.dataForm.form_parse || undefined,
                
                      'main_table_source': this.dataForm.main_table_source || undefined,
                
                      'update_name': this.dataForm.update_name || undefined,
                
              }
            ).then(({data}) => {
              if (data && data.success === 1) {
                // this.visible = false
                 this.$emit("closeModel",false);
                 this.$emit('refreshDataList')
                 this.$message({
                  message: '保存成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {

                  }
                })
              } else {
                this.$message.error(data.msg)
              }
            })
          }
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
.form-wrapper{
  padding: 16px;
}
</style>

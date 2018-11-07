<template>
 <edit-model  @submit="dataFormSubmit()" title="编辑" :modelVisible="visible" @close="closeModel">
    <el-form class="form-wrapper" :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">

      <el-form-item label="经销商名称" prop="dealer_name">
        <el-input v-model="dataForm.dealer_name" placeholder="经销商名称"></el-input>
      </el-form-item>
    
      <el-form-item label="项目名称" prop="project_name">
        <el-input v-model="dataForm.project_name" placeholder="项目名称"></el-input>
      </el-form-item>
    
      <el-form-item label="客户名称" prop="custom_name">
        <el-input v-model="dataForm.custom_name" placeholder="客户名称"></el-input>
      </el-form-item>
    
      <el-form-item label="项目地址" prop="project_address">
        <el-input v-model="dataForm.project_address" placeholder="项目地址"></el-input>
      </el-form-item>
    
      <el-form-item label="品类" prop="types">
        <el-input v-model="dataForm.types" placeholder="品类"></el-input>
      </el-form-item>
    
      <el-form-item label="阶段" prop="stage">
        <el-input v-model="dataForm.stage" placeholder="阶段"></el-input>
      </el-form-item>
    
      <el-form-item label="合同数量" prop="contract_num">
        <el-input v-model="dataForm.contract_num" placeholder="合同数量"></el-input>
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
        imageUrl:"",
        dataForm: {
          id: "",
          dealer_name: "",
          project_name: "",
          custom_name: "",
          project_address: "",
          types: "",
          stage: "",
          contract_num: "",
          create_date: "",
          update_date: "",
          
        },
        dataRule: {
          dealer_name: [
                      { required: true, message: '经销商名称不能为空', trigger: 'blur' }
                    ],
          project_name: [
                      { required: true, message: '项目名称不能为空', trigger: 'blur' }
                    ],
          
        }
      }
    },
    methods: {
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      closeModel(){
        this.$emit("closeModel",false);
      },
      adjustSelectWidth(e){
        e.target.parentNode.parentNode.style.width="100%";
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
        this.$axios.get(`${this.$baseUrl}/project/project-ctrl/info/${this.dataForm.id}`).then(({data}) => {
          if (data && data.success === 1) {
          
             this.dataForm.dealer_name = data.data.dealer_name
             this.dataForm.project_name = data.data.project_name
             this.dataForm.custom_name = data.data.custom_name
             this.dataForm.project_address = data.data.project_address
             this.dataForm.types = data.data.types
             this.dataForm.stage = data.data.stage
             this.dataForm.contract_num = data.data.contract_num
             this.dataForm.create_date = data.data.create_date
             this.dataForm.update_date = data.data.update_date
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
           this.$axios.post(
              `${this.$baseUrl}/project/project-ctrl/${!this.dataForm.id?'create':'update'}`,
              {
                
                      'id': this.dataForm.id,
                
                      'dealer_name': this.dataForm.dealer_name || undefined,
                
                      'project_name': this.dataForm.project_name || undefined,
                
                      'custom_name': this.dataForm.custom_name || undefined,
                
                      'project_address': this.dataForm.project_address || undefined,
                
                      'types': this.dataForm.types || undefined,
                
                      'stage': this.dataForm.stage || undefined,
                
                      'contract_num': this.dataForm.contract_num || undefined,
                
                      'create_date': this.dataForm.create_date || undefined,
                
                      'update_date': this.dataForm.update_date || undefined,
                
              }
            ).then(({data}) => {
              if (data && data.success === 1) {
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

<template>
 <edit-model  @submit="dataFormSubmit()" title="编辑" :modelVisible="visible" @close="closeModel">
    <el-form class="form-wrapper" :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">

      <el-form-item label="项目名称" prop="name">
        <el-input v-model="dataForm.name" placeholder="项目名称"></el-input>
      </el-form-item>
    
      <el-form-item label="客户名称" prop="custom_name">
        <el-input v-model="dataForm.custom_name" placeholder="客户名称"></el-input>
      </el-form-item>
    
      <el-form-item label="项目地址" prop="project_address">
        <el-input type="textarea" :rows="3" v-model="dataForm.project_address" placeholder="项目地址"></el-input>
      </el-form-item>
    
      <el-form-item label="品类" prop="category">
        <el-input v-model="dataForm.category" placeholder="品类"></el-input>
      </el-form-item>
    
      <el-form-item label="建立时间" prop="create_date">
        <el-date-picker
          type="datetime"
          v-model="dataForm.create_date"
          placeholder="建立时间"
        >
        </el-date-picker>
      </el-form-item>
    
      <el-form-item label="计划耗时（天）" prop="plan_time">
        <el-input-number v-model="dataForm.plan_time" placeholder="计划耗时（天）"  ></el-input-number>
      </el-form-item>
    
      <el-form-item label="实际耗时（天）" prop="actual_time">
        <el-input-number v-model="dataForm.actual_time" placeholder="实际耗时（天）"  ></el-input-number>
      </el-form-item>
    
      <el-form-item label="差值" prop="gap">
        <el-input type="number" v-model="dataForm.gap" placeholder="差值"></el-input>
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
          name: "",
          custom_name: "",
          project_address: "",
          category: "",
          create_date: "",
          plan_time: "",
          actual_time: "",
          gap: "",
          
        },
        dataRule: {
          name: [
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
        this.$axios.get(`${this.$baseUrl}/project/tb-project-plan/info/${this.dataForm.id}`).then(({data}) => {
          if (data && data.success === 1) {
          
             this.dataForm.name = data.data.name
             this.dataForm.custom_name = data.data.custom_name
             this.dataForm.project_address = data.data.project_address
             this.dataForm.category = data.data.category
             this.dataForm.create_date = data.data.create_date
             this.dataForm.plan_time = data.data.plan_time
             this.dataForm.actual_time = data.data.actual_time
             this.dataForm.gap = data.data.gap
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
           this.$axios.post(
              `${this.$baseUrl}/project/tb-project-plan/${!this.dataForm.id?'create':'update'}`,
              {
                
                      'id': this.dataForm.id,
                
                      'name': this.dataForm.name || undefined,
                
                      'custom_name': this.dataForm.custom_name || undefined,
                
                      'project_address': this.dataForm.project_address || undefined,
                
                      'category': this.dataForm.category || undefined,
                
                      'create_date': this.dataForm.create_date || undefined,
                
                      'plan_time': this.dataForm.plan_time || undefined,
                
                      'actual_time': this.dataForm.actual_time || undefined,
                
                      'gap': this.dataForm.gap || undefined,
                
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

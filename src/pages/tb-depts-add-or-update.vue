<template>
 <edit-model  @submit="dataFormSubmit()" title="编辑" :modelVisible="visible" @close="closeModel">
    <el-form class="form-wrapper" :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">

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
          parent_id: "",
          name: "",
          order_num: "",
          del_flag: "",
          
        },
        dataRule: {
          
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
        this.$axios.get(`${this.$baseUrl}//tb-depts/info/${this.dataForm.id}`).then(({data}) => {
          if (data && data.success === 1) {
          
             this.dataForm.parent_id = data.data.parent_id
             this.dataForm.name = data.data.name
             this.dataForm.order_num = data.data.order_num
             this.dataForm.del_flag = data.data.del_flag
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
           this.$axios.post(
              `${this.$baseUrl}//tb-depts/${!this.dataForm.id?'create':'update'}`,
              {
                
                      'id': this.dataForm.id,
                
                      'parent_id': this.dataForm.parent_id || undefined,
                
                      'name': this.dataForm.name || undefined,
                
                      'order_num': this.dataForm.order_num || undefined,
                
                      'del_flag': this.dataForm.del_flag || undefined,
                
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

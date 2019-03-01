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
        dataForm: {
          menu_id: "",
          parent_id: "",
          name: "",
          url: "",
          perms: "",
          type: "",
          icon: "",
          spread: "",
          order_num: "",
          
        },
        dataRule: {
          
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
        this.$axios.get(`${this.$baseUrl}/sys/sys-menu/info/${this.dataForm.id}`).then(({data}) => {
          if (data && data.success === 1) {
          
             this.dataForm.menu_id = data.data.menu_id
             this.dataForm.parent_id = data.data.parent_id
             this.dataForm.name = data.data.name
             this.dataForm.url = data.data.url
             this.dataForm.perms = data.data.perms
             this.dataForm.type = data.data.type
             this.dataForm.icon = data.data.icon
             this.dataForm.spread = data.data.spread
             this.dataForm.order_num = data.data.order_num
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
           this.$axios.post(
              `${this.$baseUrl}/sys/sys-menu/${!this.dataForm.id?'create':'update'}`,
              {
                
                      'menu_id': this.dataForm.menu_id || undefined,
                
                      'parent_id': this.dataForm.parent_id || undefined,
                
                      'name': this.dataForm.name || undefined,
                
                      'url': this.dataForm.url || undefined,
                
                      'perms': this.dataForm.perms || undefined,
                
                      'type': this.dataForm.type || undefined,
                
                      'icon': this.dataForm.icon || undefined,
                
                      'spread': this.dataForm.spread || undefined,
                
                      'order_num': this.dataForm.order_num || undefined,
                
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

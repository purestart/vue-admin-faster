/*
* Description:客户表
* Author:zcl
* Update:
*/
<template>
 <edit-model  @submit="dataFormSubmit()" title="编辑" :modelVisible="visible" @close="closeModel">
    <el-form class="form-wrapper" :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">

      <el-form-item label="x姓名" prop="name">
        <el-input v-model="dataForm.name" placeholder="x姓名"></el-input>
      </el-form-item>
    
      <el-form-item label="创建日期" prop="createDate">
        <el-date-picker
          type="datetime"
          v-model="dataForm.createDate"
          placeholder="创建日期"
        >
        </el-date-picker>
      </el-form-item>
    
      <el-form-item label="年龄" prop="age">
        <el-input-number v-model="dataForm.age" placeholder="年龄"  ></el-input-number>
      </el-form-item>
    
      <el-form-item label="长文本" prop="mytext">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          >
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
    
      <el-form-item label="浮点" prop="fl">
        <el-input v-model="dataForm.fl" placeholder="浮点"></el-input>
      </el-form-item>
    
      <el-form-item label="双进度" prop="db">
        <el-input v-model="dataForm.db" placeholder="双进度"></el-input>
      </el-form-item>
    
      <el-form-item label="其它" prop="remarks">
        <el-input v-model="dataForm.remarks" placeholder="其它"></el-input>
      </el-form-item>
    
      <el-form-item label="更新日期" prop="updateDate">
        <el-date-picker
          type="datetime"
          v-model="dataForm.updateDate"
          placeholder="更新日期"
        >
        </el-date-picker>
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
          createDate: "",
          age: "",
          mytext: "",
          blog: "",
          fl: "",
          db: "",
          remarks: "",
          updateDate: "",
          
        },
        dataRule: {
          name: [
                      { required: true, message: 'x姓名不能为空', trigger: 'blur' }
                    ],
          age: [
                      { required: true, message: '年龄不能为空', trigger: 'blur' }
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
        this.$axios.get(`${this.$baseUrl}/sys/customs/info/${this.dataForm.id}`).then(({data}) => {
          if (data && data.success === 1) {
          
             this.dataForm.name = data.data.name
             this.dataForm.createDate = data.data.createDate
             this.dataForm.age = data.data.age
             this.dataForm.mytext = data.data.mytext
             this.dataForm.blog = data.data.blog
             this.dataForm.fl = data.data.fl
             this.dataForm.db = data.data.db
             this.dataForm.remarks = data.data.remarks
             this.dataForm.updateDate = data.data.updateDate
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
           this.$axios.post(
              `${this.$baseUrl}/sys/customs/${!this.dataForm.id?'create':'update'}`,
              {
                
                      'id': this.dataForm.id,
                
                      'name': this.dataForm.name || undefined,
                
                      'createDate': this.dataForm.createDate || undefined,
                
                      'age': this.dataForm.age || undefined,
                
                      'mytext': this.dataForm.mytext || undefined,
                
                      'blog': this.dataForm.blog || undefined,
                
                      'fl': this.dataForm.fl || undefined,
                
                      'db': this.dataForm.db || undefined,
                
                      'remarks': this.dataForm.remarks || undefined,
                
                      'updateDate': this.dataForm.updateDate || undefined,
                
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

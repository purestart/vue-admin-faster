<template>
 <edit-model  @submit="dataFormSubmit()" title="编辑" :modelVisible="visible" @close="closeModel">
    <el-form class="form-wrapper" :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">

      <el-form-item label="模板名称" prop="name">
        <el-input v-model="dataForm.name" placeholder="模板名称"></el-input>
      </el-form-item>
    
      <el-form-item label="内容" prop="content">
        <input type="file" @change="getFileContent" placeholder="内容"/>
      </el-form-item>
    
      <el-form-item label="备注" prop="remarks">
        <el-input type="textarea" :rows="3" v-model="dataForm.remarks" placeholder="备注"></el-input>
      </el-form-item>
    
      <el-form-item label="分类" prop="category">
          <el-select v-model="dataForm.category" placeholder="分类"  @focus="adjustSelectWidth">
            <el-option v-for="item in categoryList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
            <!-- <el-option label="js文件" value="js">
            </el-option>
            <el-option label="java文件" value="java">
            </el-option> -->
          </el-select>
      </el-form-item>
    
      <el-form-item label="文件路径" prop="file_path">
        <el-input v-model="dataForm.file_path" placeholder="文件路径"></el-input>
      </el-form-item>
    
      <el-form-item label="文件名称" prop="file_name">
        <el-input v-model="dataForm.file_name" placeholder="文件名称"></el-input>
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
          content: "",
          create_date: "",
          update_date: "",
          remarks: "",
          del_flag: "",
          category: "",
          file_path: "",
          file_name: "",
          categoryList:[],
        },
        dataRule: {
          name: [
                      { required: true, message: '模板名称不能为空', trigger: 'blur' }
                ],
          
        }
      }
    },
    created(){
      let config=require('../../../node/config/generator-config.json');
      let typePath=config.typePath;
      let list=[];
      for (const key in typePath) {
        let item ={
          label:key+"文件",
          value:key
        }
        list.push(item);
      }
      this.categoryList=list;
      
    },
    methods: {
      getFileContent(e){
        console.log(e);
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        let that=this;
        reader.onload = function(evt) {
          // console.log("onload");
          // console.log(evt.target.result);
          that.dataForm.content=encodeURI(evt.target.result);
          that.dataForm.file_name=file.name;
        }
       
      },
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
        this.$axios.get(`${this.$baseUrl}/gen/tb-gen-template/info/${this.dataForm.id}`).then(({data}) => {
          if (data && data.success === 1) {
             //console.log(decodeURI(data.data.content));
             this.dataForm.name = data.data.name
             this.dataForm.content = data.data.content
             this.dataForm.create_date = data.data.create_date
             this.dataForm.update_date = data.data.update_date
             this.dataForm.remarks = data.data.remarks
             this.dataForm.del_flag = data.data.del_flag
             this.dataForm.category = data.data.category
             this.dataForm.file_path = data.data.file_path
             this.dataForm.file_name = data.data.file_name
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
           this.$axios.post(
              `${this.$baseUrl}/gen/tb-gen-template/${!this.dataForm.id?'create':'update'}`,
              {
                
                      'id': this.dataForm.id,
                
                      'name': this.dataForm.name || undefined,
                
                      'content': this.dataForm.content || undefined,
                
                      'create_date': this.dataForm.create_date || undefined,
                
                      'update_date': new Date(),
                
                      'remarks': this.dataForm.remarks || undefined,
                
                      'del_flag': this.dataForm.del_flag || undefined,
                
                      'category': this.dataForm.category || undefined,
                
                      'file_path': this.dataForm.file_path || undefined,
                
                      'file_name': this.dataForm.file_name || undefined,
                
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

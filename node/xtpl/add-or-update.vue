<template>
 <edit-model  @submit="dataFormSubmit()" title="编辑" :modelVisible="visible" @close="closeModel">
    <el-form class="form-wrapper" :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
{{#each(obj.table.columns)~}}
 {{#if(this.name !== obj.keyname && this.existForm)~}}
    {{#if(this.formItemType === 'datetime')~}}
      <el-form-item label="{{this.remarks}}" prop="{{this.name}}">
        <el-date-picker
          type="datetime"
          v-model="dataForm.{{this.name}}"
          placeholder="{{this.remarks}}"
        >
        </el-date-picker>
      </el-form-item>
    {{elseif (this.formItemType === 'number')}}
      <el-form-item label="{{this.remarks}}" prop="{{this.name}}">
        <el-input type="number" v-model="dataForm.{{this.name}}" placeholder="{{this.remarks}}"></el-input>
      </el-form-item>
    {{elseif (this.formItemType === 'counter')}}
      <el-form-item label="{{this.remarks}}" prop="{{this.name}}">
        <el-input-number v-model="dataForm.{{this.name}}" placeholder="{{this.remarks}}"  ></el-input-number>
      </el-form-item>
    {{elseif (this.formItemType === 'miltiText')}}
      <el-form-item label="{{this.remarks}}" prop="{{this.name}}">
        <el-input type="textarea" :rows="3" v-model="dataForm.{{this.name}}" placeholder="{{this.remarks}}"></el-input>
      </el-form-item>
    {{elseif (this.formItemType === 'select')}}
      <el-form-item label="{{this.remarks}}" prop="{{this.name}}">
          <el-select v-model="dataForm.{{this.name}}" placeholder="{{this.remarks}}"  @focus="adjustSelectWidth">
            <el-option label="选项一" value="value1">
            </el-option>
            <el-option label="选项二" value="value2">
            </el-option>
          </el-select>
      </el-form-item>
    {{elseif (this.formItemType === 'radio')}}
      <el-form-item label="{{this.remarks}}" prop="{{this.name}}">
        <el-radio-group v-model="dataForm.{{this.name}}">
          <el-radio-button label="上海"></el-radio-button>
          <el-radio-button label="北京"></el-radio-button>
          <el-radio-button label="广州"></el-radio-button>
          <el-radio-button label="深圳"></el-radio-button>
        </el-radio-group>
      </el-form-item>
    {{elseif (this.formItemType === 'checkBox')}}
      <el-form-item label="{{this.remarks}}" prop="{{this.name}}">
        <el-checkbox-group v-model="dataForm.{{this.name}}">
          <el-checkbox label="复选框 A"></el-checkbox>
          <el-checkbox label="复选框 B"></el-checkbox>
          <el-checkbox label="复选框 C"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      {{elseif (this.formItemType === 'file')}}
      <el-form-item label="{{this.remarks}}" prop="{{this.name}}">
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
    {{else}}
      <el-form-item label="{{this.remarks}}" prop="{{this.name}}">
        <el-input v-model="dataForm.{{this.name}}" placeholder="{{this.remarks}}"></el-input>
      </el-form-item>
    {{~/if}}
    
{{~/if}}
{{~/each}}
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
          {{#each(obj.table.columns)~}}
                    {{this.name}}: "",
          {{~/each}}
        },
        dataRule: {
          {{#each(obj.table.columns)~}}
          {{#if(this.name !== obj.keyname && this.existForm && !this.isEmpty)~}}
                    {{this.name}}: [
                      { required: true, message: '{{this.remarks}}不能为空', trigger: 'blur' }
                    ],
          {{~/if}}
          {{~/each}}
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
          if (this.dataForm.{{obj.keyname}}) {
            this.getInfo()
          }
        })
      },
      // 获取信息
      getInfo () {
        this.$axios.get(`${this.$baseUrl}/{{obj.table.module_name}}/{{obj.fileSubName}}/info/${this.dataForm.{{obj.keyname}}}`).then(({data}) => {
          if (data && data.success === 1) {
          {{#each(obj.table.columns)~}}
          {{#if(this.name !== obj.keyname)~}}
             this.dataForm.{{this.name}} = data.data.{{this.name}}
          {{~/if}}
          {{~/each}}
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
           this.$axios.post(
              `${this.$baseUrl}/{{obj.table.module_name}}/{{obj.fileSubName}}/${!this.dataForm.{{obj.keyname}}?'create':'update'}`,
              {
                {{#each(obj.table.columns)~}}
                {{#if(this.name !== obj.keyname)~}}
                      '{{this.name}}': this.dataForm.{{this.name}} || undefined,
                {{else}}
                      '{{this.name}}': this.dataForm.{{this.name}},
                {{~/if}}
                {{~/each}}
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

<template>
  <div class="form1-container">
    <div class="page-header">
        <div class="title">通用表单</div>
        <a href="javascript:void(0)">返回</a>
    </div>
    <div class="content">
        <el-form size="small" :rules="rules" ref="ruleform" :model="form" label-width="120px">
        <el-form-item prop="name" class="text-width" label="名称">
            <el-input  v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item prop="region" label="区域">
            <el-select v-model="form.region" placeholder="请选择区域">
            <el-option label="上海" value="shanghai"></el-option>
            <el-option label="北京" value="beijing"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item prop="num" label="数量">
            <el-input-number v-model="form.num" :min="1" :max="10" label="描述文字"></el-input-number>
        </el-form-item>
        <el-form-item class="text-width" label="开始时间">
            <el-col :span="11">
                <el-form-item prop="date1">

                     <el-date-picker  type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                </el-form-item>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
                <el-form-item prop="date2">
                     <el-time-picker  type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
                </el-form-item>
            </el-col>
        </el-form-item>
        <el-form-item label="是否有效">
            <el-switch v-model="form.delivery"></el-switch>
        </el-form-item>
        <el-form-item prop="type" label="类型">
            <el-checkbox-group v-model="form.type">
            <el-checkbox label="类型一" name="type"></el-checkbox>
            <el-checkbox label="类型二" name="type"></el-checkbox>
            <el-checkbox label="类型三" name="type"></el-checkbox>
            <el-checkbox label="类型四" name="type"></el-checkbox>
            </el-checkbox-group>
        </el-form-item>
        <el-form-item prop="resource" label="资源类型">
            <el-radio-group v-model="form.resource">
            <el-radio label="音频"></el-radio>
            <el-radio label="视频"></el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="图片上传">
            <el-upload
                class="avatar-uploader-longer"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
             </el-upload>
            <!-- <el-upload
            class="upload-demo"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload> -->
        </el-form-item>

        <el-form-item class="editor-width" label="详情">
            <div class="edit-container">
                <quill-editor v-model="content"
                                ref="myQuillEditor"
                                :options="editorOption"
                                @blur="onEditorBlur($event)"
                                @focus="onEditorFocus($event)"
                                @ready="onEditorReady($event)"
                                
                                >
                </quill-editor>
            </div>

        </el-form-item>
        <el-form-item class="text-width" label="描述">
            <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">提交</el-button>
            <el-button @click="onReset">重置</el-button>
        </el-form-item>
        </el-form>
    </div>
    

  </div>
</template>

<script>
export default {
  data() {
    return {
        imageUrl:"",
      content:"",
      editorOption:{},
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
        num:1,
      },
      rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
      },
    }
  },
  methods: {
    onSubmit() {
      //this.$message('submit!');
      console.log(this.$refs)
      this.$refs.ruleform.validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    },
    onReset(){
        this.$refs.ruleform.resetFields();
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },
          onEditorBlur(editor) {
        console.log('editor blur!', editor)
      },
      onEditorFocus(editor) {
        console.log('editor focus!', editor)
      },
      onEditorReady(editor) {
        console.log('editor ready!', editor)
      },
            handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
  }
}
</script>

<style lang="scss">
.edit-container{
           
  .ql-container.ql-snow{
      min-height: 200px;
  }
}
</style>

<style lang="scss" scoped>
.form1-container{
    padding-bottom: 16px;
    margin: 16px;
    background-color: #fff;
    .page-header{
        display: flex;
        justify-content:space-between;
        align-items: center;
        height: 40px;
        border-bottom: 1px solid #e4e4e4;
        .title{
            margin-left: 10px;
        }
        a{
            margin-right: 10px;
            font-size: 12px;
        }
    }
    .content{
        padding: 16px;
        .text-width{
            width: 700px;
        }
        .editor-width{
            width: 60%;
            min-width: 700px;
        }


       


    }
}
.line{
  text-align: center;
}
</style>
/*
* author:詹陈龙
* description:个人中心-基本信息
* update:
*/
<template>
  <div class="personImfo">
    <div class="personImfo-header">
      <div class="title">基本资料</div>
      <!-- <a href="javascript:void(0)">返回</a> -->
    </div>
    <div class="content">
        <el-form ref="ruleform" :model="form" label-width="120px" label-position="right" size="small" :rules="rules" :status-icon="true">
          <el-form-item label="登陆账号" >
            <span>尚未绑定邮箱，部分功能受限，请<a href="#">绑定邮箱</a>！</span>
          </el-form-item>
            <el-form-item label="昵称" prop="name">
              <el-col :span="8">
              <el-input v-model="form.name"></el-input>
              </el-col>
            </el-form-item>
          <el-form-item label="性别" prop="resource">
            <el-radio-group v-model="form.resource">
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="出生日期" prop="date1">
            <el-col :span="4">
              <el-date-picker type="date" placeholder="请选择出生日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
            </el-col>
          </el-form-item>
          <!-- <el-form-item label="居住地区" >
            <Region></Region>
          </el-form-item> -->
          <el-form-item label="头像上传" >
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="true"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="个性签名" size="medium" prop="desc">
            <el-col :span="8">
            <el-input type="textarea" v-model="form.desc"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">保存</el-button>
            <el-button @click="onReset">重置</el-button>
          </el-form-item>
        </el-form>
    </div>
  </div>
</template>

<script>
//import Region from '../../components/RegionComponent/region'
export default {
  data() {
    return {
      form: {
        name: "张三",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "男",
        desc: "",
        imageUrl: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入用户昵称", trigger: "blur" },
          { min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur" }
        ],
        region: [
          { required: true, message: "请选择用户居住地", trigger: "change" }
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change"
          }
        ],
        type: [
          {
            type: "string",
            required: true,
            message: "请至少选择一张图片",
            trigger: "click"
          }
        ],
        resource: [
          { required: true, message: "请确认性别", trigger: "change" }
        ],
        desc: [{ required: true, message: "请填写个人签名", trigger: "blur" }]
      }
    };
  },
  components: {
    //Region
  },
  methods: {
    onSubmit() {
      //this.$message('submit!');
      console.log(this.$refs);
      this.$refs.ruleform.validate(valid => {
        console.log(valid);
        if (valid) {
          //alert('submit!');
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    onReset() {
      this.$refs.ruleform.resetFields();
    },
    handleAvatarSuccess(res, file) {
      this.form.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>

<style lang="scss" scoped>
.personImfo {
  padding-bottom: 16px;
  margin: 16px;
  background-color: #fff;
  .personImfo-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    border-bottom: 1px solid #e4e4e4;
    .title {
      margin-left: 10px;
    }
    a {
      margin-right: 10px;
      font-size: 12px;
    }
  }
  .content {
    padding: 16px;
  }
}
</style>

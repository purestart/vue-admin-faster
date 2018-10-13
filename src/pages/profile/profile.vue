/*
* author:詹陈龙
* description:个人中心
* update:
*/
<template>
    <div class="profile-container">
      <!-- @tab-click="handleClick" -->
      <el-tabs v-model="activeName" >
        <el-tab-pane label="个人信息中心" name="grx1">
          <div class="grx1-panel">
            <div class="profile-left">
              <PersonImfo ></PersonImfo>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="个人训练监控" name="grx2">
          <ListPage>

          </ListPage>
        </el-tab-pane>
        <el-tab-pane label="证照信息" name="grx3">
          <el-tabs value="zzx1">
              <el-tab-pane label="资质" name="zzx1"></el-tab-pane>
              <el-tab-pane label="体检" name="zzx2"></el-tab-pane>
              <el-tab-pane label="执照" name="zzx3"></el-tab-pane>
          </el-tabs>
        </el-tab-pane>
        <el-tab-pane label="详细信息" name="grx4">
          <DetailInfo></DetailInfo>
        </el-tab-pane>
        <el-tab-pane label="修改密码" name="grx5">
          <div class="grx5-content">
            <el-form ref="ruleForm" :model="form" label-width="120px" label-position="right" size="small" :rules="rules" :status-icon="true">
              <el-form-item label="旧的登陆密码" prop="oldPassword">
                <el-col :span="8">
                  <el-input v-model="form.oldPassword"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="新密码" prop="newPassword">
                <el-col :span="8">
                  <el-input v-model="form.newPassword"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="确认新密码" prop="comPassword">
                <el-col :span="8">
                  <el-input v-model="form.comPassword"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" >保存</el-button>
                <el-button >重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
</template>

<script type='text/ecmascript-6'>
import PersonImfo from "./person-info.vue";
import ListPage from "./listPage/list-page.vue";
import DetailInfo from "./detail-Info.vue";
export default {
  components: {
    PersonImfo,
    ListPage,
    DetailInfo
  },
  data() {
    var validatePass = (rules, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.form.newPassword !== "") {
        }
        callback();
      }
    };
    var validatePass2 = (rules, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.newPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      activeName: "grx1",
      form: {
        oldPassword: "",
        newPassword: "",
        comPassword: ""
      },
      rules: {
        oldPassword: [
          { required: true, message: "请输入旧密码", trigger: "blur" },
          { min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur" }
        ],
        newPassword: [{ validator: validatePass, trigger: "blur" }],
        comPassword: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  created() {},
  mounted() {
    console.log(this.$route.params.tab);
    let tab = this.$route.params.tab;
    if (tab && tab.indexOf("grx") != -1) {
      this.activeName = tab;
    }
  },
  methods: {},
  watch: {
    $route(to, from) {
      // data数据操作
      //console.log("数据变化");
      console.log(to);
      let tab = this.$route.params.tab;
      if (tab && tab.indexOf("grx") != -1) {
        this.activeName = tab;
      }
    }
  }
};
</script>

<style lang='scss' scoped>
.profile-container {
  padding: 16px;
  margin: 16px;
  background-color: #ffffff;
  .grx1-panel {
    padding: 10px;

    .profile-left {
      box-shadow: 0px 0px 2px #e4e4e4;

      border-radius: 5px;
    }
  }

  .grx5-content {
    padding: 15px 0px;
  }
}
</style>
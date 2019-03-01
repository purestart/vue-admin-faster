<template>
 <edit-model  @submit="dataFormSubmit()" title="编辑" :modelVisible="visible" @close="closeModel">
    <el-form class="form-wrapper" :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">

      <el-form-item label="名称" prop="name">
        <el-input v-model="dataForm.name" placeholder="名称"></el-input>
      </el-form-item>
    
      <el-form-item label="模板" prop="template">
        <!-- <el-input v-model="dataForm.template" placeholder="模板"></el-input> -->

         <el-select style="min-width:688px;" v-model="selectedTemp" multiple placeholder="请选择">
            <el-option
              v-for="item in tempList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="排序" prop="order_num">
        <el-input-number v-model="dataForm.order_num" placeholder="排序"  ></el-input-number>
      </el-form-item>
      <el-form-item label="备注" prop="remarks">
        <el-input type="textarea" :rows="3" v-model="dataForm.remarks" placeholder="备注"></el-input>
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
        selectedTemp:[],
        tempList:[],
        dataForm: {
          id: "",
          name: "",
          create_date: "",
          update_date: "",
          template: "",
          remarks:"",
          order_num:0
        },
        dataRule: {
          name: [
                      { required: true, message: '名称不能为空', trigger: 'blur' }
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
        this.getTempList();
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          this.selectedTemp=[];
          if (this.dataForm.id) {
            this.getInfo()
          }
        })
      },
      getTempList () {
        
        this.$axios.get(
          `${this.$baseUrl}/gen/tb-gen-template/list`,
          {
              params: {
                  'pageNum': 1,
                  'pageSize': 100,
                  'query': {}
              }
          }
        ).then(({data}) => {
          if (data && data.success == 1) {
            this.tempList = data.data.list
            
          } else {
            this.tempList = []
            
          }
          
        })
      },
      // 获取信息
      getInfo () {
        this.$axios.get(`${this.$baseUrl}/gen/tb-gen-type/info/${this.dataForm.id}`).then(({data}) => {
          if (data && data.success === 1) {
          
             this.dataForm.name = data.data.name
             this.dataForm.create_date = data.data.create_date
             this.dataForm.update_date = data.data.update_date
             this.dataForm.template = data.data.template
             this.dataForm.remarks=data.data.remarks;
             this.dataForm.order_num=data.data.order_num;
             this.selectedTemp=JSON.parse(data.data.template);
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
           this.$axios.post(
              `${this.$baseUrl}/gen/tb-gen-type/${!this.dataForm.id?'create':'update'}`,
              {
                
                      'id': this.dataForm.id,
                
                      'name': this.dataForm.name || undefined,
                
                      'create_date': this.dataForm.create_date || undefined,
                
                      'update_date': this.dataForm.update_date || undefined,
                
                      'template': JSON.stringify(this.selectedTemp),
                      'remarks':this.dataForm.remarks || undefined,
                      'order_num':this.dataForm.order_num
                
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

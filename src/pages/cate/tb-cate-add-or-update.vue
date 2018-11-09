/*
* Description:分类
* Author:zcl
* Update:
*/
<template>
 <edit-model  @submit="dataFormSubmit()" title="编辑" :modelVisible="visible" @close="closeModel">
    <el-form class="form-wrapper" :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">

      <el-form-item label="分类名称" prop="name">
        <el-input v-model="dataForm.name" placeholder="分类名称"></el-input>
      </el-form-item>
    
    
    <el-form-item label="上级部门" prop="parent_name">
        <el-popover
          ref="deptListPopover"
          placement="bottom-start"
          trigger="click">
          <el-tree
            :data="deptList"
            :props="deptListTreeProps"
            node-key="id"
            ref="deptListTree"
            @current-change="deptListTreeCurrentChangeHandle"
            :highlight-current="true"
            :expand-on-click-node="false">
          </el-tree>
        </el-popover>
        <el-input v-model="dataForm.parent_name" v-popover:deptListPopover :readonly="true" placeholder="上级部门"></el-input>
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
        deptList: [],
        deptListTreeProps: {
          label: 'name',
          children: 'children'
        },
        dataForm: {
          id: "",
          name: "",
          parent_id: "",
          order_num: "",
          remarks: "",
          
          parent_name:""
        },
        dataRule: {
          name: [
                      { required: true, message: '分类名称不能为空', trigger: 'blur' }
                    ],
          parent_id: [
                      { required: true, message: '父级Id不能为空', trigger: 'blur' }
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
        this.getDeptList();
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields();

          if (this.dataForm.id) {
            this.getInfo()
          }
        })
      },
      // 获取列表
      getDeptList () {
        return this.$axios.get(`${this.$baseUrl}/cate/tb-cate/nav`).then(({data}) => {
          if (data && data.success === 1) {
            this.deptList=[{
              id:0,
              name:"一级部门",
              parent_id:0,
              children:data.data
            }];
          }
        })
      },
      // 获取信息
      getInfo () {
        this.$axios.get(`${this.$baseUrl}/cate/tb-cate/info/${this.dataForm.id}`).then(({data}) => {
          if (data && data.success === 1) {
          
             this.dataForm.name = data.data.name
             this.dataForm.parent_id = data.data.parent_id
             this.dataForm.order_num = data.data.order_num
             this.dataForm.remarks = data.data.remarks
            // 部门树设置当前选中节点
            this.$refs.deptListTree.setCurrentKey(this.dataForm.parent_id)
            this.dataForm.parent_name = this.dataForm.parent_id === this.$refs.deptListTree.getCurrentKey()
              ? this.$refs.deptListTree.getCurrentNode()['name']
              : ''
          }
        })
      },
      // 部门树选中
      deptListTreeCurrentChangeHandle (data, node) {
        this.dataForm.parent_id = data.id
        this.dataForm.parent_name = data.name
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
           this.$axios.post(
              `${this.$baseUrl}/cate/tb-cate/${!this.dataForm.id?'create':'update'}`,
              {
                
                      'id': this.dataForm.id,
                
                      'name': this.dataForm.name,
                
                      'parent_id': this.dataForm.parent_id,
                
                      'order_num': this.dataForm.order_num,
                
                      'remarks': this.dataForm.remarks,
                
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

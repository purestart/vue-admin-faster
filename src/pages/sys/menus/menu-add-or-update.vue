<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="类型" prop="type">
        <el-radio-group v-model="dataForm.type">
          <el-radio v-for="(type, index) in dataForm.typeList" :label="index" :key="index">{{ type }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item :label="dataForm.typeList[dataForm.type] + '名称'" prop="name">
        <el-input v-model="dataForm.name" :placeholder="dataForm.typeList[dataForm.type] + '名称'"></el-input>
      </el-form-item>
      <el-form-item label="上级菜单" prop="parentName">
        <el-popover
          ref="menuListPopover"
          placement="bottom-start"
          trigger="click">
          <el-tree
            :data="menuList"
            :props="menuListTreeProps"
            node-key="menu_id"
            ref="menuListTree"
            @current-change="menuListTreeCurrentChangeHandle"
            :highlight-current="true"
            :expand-on-click-node="false">
          </el-tree>
        </el-popover>
        <el-input v-model="dataForm.parentName" v-popover:menuListPopover :readonly="true" placeholder="点击选择上级菜单" class="menu-list__input"></el-input>
      </el-form-item>
      <el-form-item v-if="dataForm.type === 1" label="菜单路由" prop="url" :class="{ 'is-required': dataForm.type === 1 }">
        <el-input v-model="dataForm.url" placeholder="菜单路由"></el-input>
      </el-form-item>
      <el-form-item v-if="dataForm.type !== 0" label="授权标识" prop="perms">
        <el-input v-model="dataForm.perms" placeholder="多个用逗号分隔, 如: user:list,user:create"></el-input>
      </el-form-item>
      <el-form-item v-if="dataForm.type !== 2" label="排序号" prop="order_num">
        <el-input-number v-model="dataForm.order_num" controls-position="right" :min="0" label="排序号"></el-input-number>
      </el-form-item>
      <el-form-item v-if="dataForm.type !== 2" label="菜单图标" prop="icon">
        <el-popover
          ref="iconListPopover"
          placement="bottom-start"
          trigger="click"
          popper-class="mod-sys__menu-icon-popover">
          <div class="mod-sys__menu-icon-list">
            <el-button
              v-for="(item, index) in dataForm.iconList"
              :key="index"
              @click="dataForm.icon = item"
              :class="{ 'is-active': dataForm.icon === item }">
              <i :class="item"></i>
              <!-- <icon-svg :name="item"></icon-svg> -->
            </el-button>
          </div>
        </el-popover>
        <el-input v-model="dataForm.icon" v-popover:iconListPopover :readonly="true" placeholder="菜单图标名称" class="icon-list__input"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import { treeDataTranslate } from '@/utils'
  // import Icon from '@/icons'
  import { iconList } from "../../../config";
  export default {
    data () {
      var validateUrl = (rule, value, callback) => {
        if (this.dataForm.type === 1 && (!value || !/\S/.test(value))) {
          callback(new Error('菜单路由不能为空'))
        } else {
          callback()
        }
      }
      return {
        visible: false,
        menuList: [],
        menuListTreeProps: {
          label: 'name',
          children: 'children'
        },
        dataForm: {
          id: 0,
          type: 1,
          typeList: ['目录', '菜单', '按钮'],
          name: '',
          parentId: 0,
          parentName: '',
          url: '',
          perms: '',
          orderNum: 0,
          icon: '',
          iconList: []
        },
        dataRule: {
          name: [
            { required: true, message: '必填项不能为空', trigger: 'blur' }
          ],
          parentName: [
            { required: true, message: '必填项不能为空', trigger: 'change' }
          ],
          url: [
            { validator: validateUrl, trigger: 'blur' }
          ]
        }
      }
    },
    watch: {
      'dataForm.type' (val) {
        this.$refs['dataForm'].clearValidate()
      }
    },
    methods: {
      init () {
       // this.dataForm.iconList = Icon.getNameList()
       this.dataForm.iconList=iconList;
        this.getMenuList().then(() => {
          this.visible = true
          this.$nextTick(() => {
            this.$refs['dataForm'].resetFields()
            if (this.dataForm.id) {
              this.getMenuInfo()
            }
          })
        })
      },
      // 获取菜单列表
      getMenuList () {

        // return new Promise((resolve, reject) => {
            
        //     let data=require("./selectMenu.json");
        //     console.log("data");
        //     console.log(data);
        //     if (data) {
        //         this.menuList = treeDataTranslate(data.menuList || [], 'menuId')
        //         resolve();
        //     }
        // })
        
        return this.$axios.get(`${this.$baseUrl}/sys/menu/nav`).then(({data}) => {
          if (data) {
            // this.menuList = treeDataTranslate(data.menuList || [], 'menuId')
            // this.menuList =data.data;
            let munuList=[{
                children:data.data,
                menu_id:0,
                name:"一级菜单",
                order_num:0,
                parent_id:0,
                perms:null,
                spread:0,
                type:0,
                url:null
            }]
            this.menuList =munuList;

          }
        })

      },
      // 获取菜单信息
      getMenuInfo () {
       // let data=require("./menu-info.json");
        this.$axios.get(`${this.$baseUrl}/sys/sys-menu/info/${this.dataForm.id}`).then(({data}) => {
          console.log(data);
          if (data && data.success === 1) {
            this.dataForm.id = data.data.menu_id
            this.dataForm.type = data.data.type
            this.dataForm.name = data.data.name
            this.dataForm.parent_id = data.data.parent_id
            this.dataForm.url = data.data.url
            this.dataForm.perms = data.data.perms
            this.dataForm.order_num = data.data.order_num
            this.dataForm.icon = data.data.icon
            console.log(this.dataForm);
            // 菜单树设置当前选中节点
            this.$refs.menuListTree.setCurrentKey(this.dataForm.parent_id)
            this.dataForm.parentName = this.dataForm.parent_id === this.$refs.menuListTree.getCurrentKey()
              ? this.$refs.menuListTree.getCurrentNode()['name']
              : ''
          }
        })
      },
      // 菜单树选中
      menuListTreeCurrentChangeHandle (data, node) {
        console.log("menuListTreeCurrentChangeHandle");
        console.log(data);
        this.dataForm.parent_id = data.menu_id
        this.dataForm.parentName = data.name
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$axios.post(
              `${this.$baseUrl}/sys/sys-menu/${!this.dataForm.id ? 'create' : 'update'}`,
              {
                'menu_id': this.dataForm.id || undefined,
                'type': this.dataForm.type,
                'name': this.dataForm.name,
                'parent_id': this.dataForm.parent_id,
                'url': this.dataForm.url,
                'perms': this.dataForm.perms,
                'order_num': this.dataForm.order_num,
                'icon': this.dataForm.icon
              }
            ).then(({data}) => {
              if (data && data.success === 1) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {

                  }
                })
                this.$emit('refreshDataList')
                this.visible = false
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

<style lang="scss">
  .mod-sys__menu {
    .menu-list__input,
    .icon-list__input {
       > .el-input__inner {
        cursor: pointer;
      }
    }
    &-icon-popover {
      max-width: 370px;
    }
    &-icon-list {
      padding: 0;
      margin: -8px 0 0 -8px;
      > .el-button {
        padding: 8px;
        margin: 8px 0 0 8px;
        > span {
          display: inline-block;
          vertical-align: middle;
          width: 18px;
          height: 18px;
          font-size: 18px;
        }
      }
    }
  }
</style>

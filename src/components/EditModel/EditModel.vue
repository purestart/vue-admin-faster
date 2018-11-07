<template>
    <div :style="'width:'+width+'px;height:'+height+'px;z-index:'+zIndex+';'" :class="modelVisible?'show':''" class="edit-model">
        <div class="edit-box">
            <div  class="model-header">
                <span>{{title}}</span>
                <span class="tool-bar">
                    <i @click="closeModel" class="el-icon-close"></i>
                </span>
            </div>
            <div :style="'height:'+(height-40)+'px;overflow-y: scroll;padding-bottom:15px;'">
                <slot></slot>
            </div>
            <div class="btn">
                <el-button type="primary"  size="mini" @click="submitForm">确认</el-button>
                <el-button type="primary"  size="mini" @click="closeModel">取消</el-button>
            </div>
        </div>

    </div>
</template>

<script type='text/ecmascript-6'>
  export default {
    name:"EditModel",
    props:{
        modelVisible:{
            type:Boolean,
            required:false,
            default:false
        },
        title:{
            type:String,
            required:false,
            default:""
        },
        width:{
            type:Number,
            required:false,
            default:800
        },
        height:{
            type:Number,
            required:false,
            default:600
        },
        zIndex:{
            type:Number,
            required:false,
            default:200
        }
    },
    data () {
      return {
      }
    },
    created () {
    },
    mounted () {

    },
    methods:{
        closeModel(){
            this.$emit('close', false)
        },
        submitForm(){
            this.$emit('submit', false)
        }
    }
  }
</script>

<style lang='scss' scoped>
.edit-model{
          position: fixed;
          margin:auto;
            left:0;
            right:0;
            top:0;
            bottom:0;
            box-shadow: 1px 1px 50px rgba(0,0,0,.3);
          line-height: 1;
          background-color: #ffffff;
          
          transition: transform .5s;
          transform: scale(0,0);
          
          &.show{
              transform: scale(1,1);
          }
        //   .edit-box{
        //       background-color: #ffffff;
        //       width: 500px;
        //       height: 500px;
        //   }
          .model-header{
              padding: 10px 12px;
              font-size: 14px;
              border-bottom: 1px solid #e4e4e4;
              display: -ms-flexbox;
              display: -moz-box;
              display:-webkit-box;
              display: -webkit-flex;
              display: flex;
              box-pack:space-between;
              -webkit--moz-box-pack:space-between;
              -moz-box-pack:space-between;
              -webkit-justify-content:space-between;
              justify-content:space-between;
              background-color: #F8F8F8;
              line-height: 1;
          }
          .btn{
              position: absolute;
              bottom: 0;
              width: 100%;
              text-align: right;
              padding: 5px 15px;
              background-color: #F8F8F8;
              border-top: 1px solid #e4e4e4;
          }
      }
</style>
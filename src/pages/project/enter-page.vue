<template>
    <div class="enter-page-container">
        <div class="header">业务流程启动管理</div>
        <div class="content-wraper">
            <div v-for="item in list">
                <div class="top-line">
                    <div class="title-box">
                        <i class='el-icon-menu'></i>
                        <span>{{item.name}}(5)</span> 
                    </div>
                </div>
                <div class="btn-wraper">
                    <div v-for="btn in item.children" class="btn">{{btn.name}}</div>
                    <!-- <div class="btn">用车申请</div> -->
                </div>
            </div>

        </div>
    </div>
</template>

<script type='text/ecmascript-6'>
  export default {
    data () {
      return {
          list:[
              {
                  id:0,
                  name:"日常管理",
                  children:[
                      {
                          id:0,
                          name:"用印申请"
                      },
                       {
                          id:0,
                          name:"用车申请"
                      },
                      {
                          id:0,
                          name:"发货申请"
                      }
                  ]
              },
              {
                  id:1,
                  name:"备案管理",
                  children:[
                      {
                          id:0,
                          name:"新建备案申请"
                      },
                                            {
                          id:1,
                          name:"备案更新"
                      }
                  ]
              },
               {
                  id:2,
                  name:"投标管理",
                  children:[
                      {
                          id:0,
                          name:"新建投标申请"
                      }
                  ]
              },
                            {
                  id:1,
                  name:"合同管理",
                  children:[
                      {
                          id:0,
                          name:"新建合同申请"
                      }
                  ]
              },
              {
                  id:1,
                  name:"订单管理",
                  children:[
                      {
                          id:0,
                          name:"新建下单申请"
                      },
                      {
                          id:0,
                          name:"新建遗留订单"
                      }
                  ]
              }
          ]
      }
    },
    created () {
    },
    mounted () {

    },
    methods:{

    }
  }
</script>

<style lang='scss' scoped>
.enter-page-container{
    padding: 16px;
    margin: 16px;
    background-color: #ffffff;
    .header{
        padding-bottom: 16px;
        border-bottom: 1px solid #e4e4e4;
    }
    .content-wraper{
        padding-top: 16px;
        margin-top: 16px;
        .top-line{
            height: 1px;
            background-color: #e4e4e4;
            position: relative;
            .title-box{
                position: absolute;
                left: 0;
                top:-16px;
                font-size: 14px;
                background-color: #f2f2f2;
                padding: 5px 10px;
            }
        }
        .btn-wraper{
            padding: 35px 20px;
            .btn{
                background-color: #f08519;
                display: inline-block;
                color: #ffffff;
                font-size: 14px;
                padding: 6px 15px;
                border-radius: 5px;
                margin-right: 16px;
            }
        }
    }
}
</style>
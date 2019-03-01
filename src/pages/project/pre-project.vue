/*
* author:詹陈龙
* description:项目准备页
* update:
*/
<template>
  <div class="pre-project">
    <div class="my-project">
       <span class="tip">暂无项目</span> 
    </div>
    <div class="desc-wraper">
      <div class="my-job">
        <div class="header">
          <span class="title">我的任务</span>
        </div>
      </div>
      <div class="my-notice">
        <div class="header">
          <span class="title">任务提醒</span>
        </div>
        <div class="notice-wraper">
          <div class="notice-item">
            <img src="/static/images/rel_ontime.png" >
            <span>准时完成</span>
          </div>
          <div class="notice-item">
            <img src="/static/images/rel_passport.png" >
            <span>保证质量</span>
          </div>
          <div class="notice-item">
            <img src="/static/images/rel_rest.png" >
            <span>高效率</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
  export default {
    data () {
      return {
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
.pre-project{
    margin: 16px;
  .my-project{
    min-height: 300px;
    background-color: #ffffff;
    border-radius: 5px;
    display: -ms-flexbox;
    display: -moz-box;
    display:-webkit-box;
    display: -webkit-flex;
    display: flex;
    box-pack:center;
    -webkit--moz-box-pack:center;
    -moz-box-pack:center;
    -webkit-justify-content:center;
    justify-content:center;
    box-align:center;
    -moz-box-align:center;
    -webkit-box-align:center;
    -webkit-align-items:center;
    align-items:center;
    .tip{
      font-size: 18px;
    }
  }
  .desc-wraper{
    display: -ms-flexbox;
    display: -moz-box;
    display:-webkit-box;
    display: -webkit-flex;
    display: flex;
    margin-top: 10px;
    .my-job{
      min-height: 200px;
      -moz-box-flex:1;
      box-flex:1;
      -webkit-box-flex:1;
      -webkit-flex:1;
      flex:1;
      background-color: #ffffff;
      border-radius: 5px;
      .header{
        padding: 10px 10px;
        border-bottom: 1px solid #e4e4e4;
        .title{
          font-size: 16px;
          padding: 3px 10px;
          border-left: 5px solid #d20202;
        }
      }
    }
    .my-notice{
      min-height: 200px;
      -moz-box-flex:1;
      box-flex:1;
      -webkit-box-flex:1;
      -webkit-flex:1;
      flex:1;
      margin-left: 10px;
      background-color: #ffffff;
      border-radius: 5px;
      .header{
        padding: 10px 10px;
        border-bottom: 1px solid #e4e4e4;
        .title{
          font-size: 16px;
          padding: 3px 10px;
          border-left: 5px solid #d20202;
        }
      }

      .notice-wraper{
        display: -ms-flexbox;
        display: -moz-box;
        display:-webkit-box;
        display: -webkit-flex;
        display: flex;
        .notice-item{
          width:33.333%;
          height: 160px;
          display: -ms-flexbox;
          display: -moz-box;
          display:-webkit-box;
          display: -webkit-flex;
          display: flex;

          flex-direction:column;
          box-pack:center;
          -webkit--moz-box-pack:center;
          -moz-box-pack:center;
          -webkit-justify-content:center;
          justify-content:center;
          box-align:center;
          -moz-box-align:center;
          -webkit-box-align:center;
          -webkit-align-items:center;
          align-items:center;

          img{
            width: 65px;
            height: 65px;
          }
          span{
            margin-top: 10px;
            font-size: 16px;
          }

        }
      }

    }
  }
}
</style>
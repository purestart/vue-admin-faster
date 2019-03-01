<template>
    <div class="note-dashboard-item">
        <!-- <dashboard-title :dashboard="dashboard" :more="data && !!data.link" @click="titleClick"></dashboard-title> -->
        <div class="item-header">
            <div class="left">
                <div @click="changeTab(0)" :class="currentTab==0?'active':''" class="tab-item ">日视图</div>
                <div @click="changeTab(1)" :class="currentTab==1?'active':''" class="tab-item">周视图</div>
                <div @click="changeTab(2)" :class="currentTab==2?'active':''" class="tab-item">月视图</div>
            </div>
            <div class="more">
                <span>more></span>
            </div>
        </div>
        <div v-if="currentTab==0" class="day-grid">
            <div v-for="(item,index) in 7" class="grid-item">
                <div class="week-name">
                    {{weekName[index]}}
                </div>
                <div class="day-num">
                    <div class="date-box" :class="index==3?'active':''">
                    {{index+1}}
                    </div>
                </div>
            </div>
        </div>
        <div v-if="currentTab==1" class="week-grid">
            <div v-for="(item,index) in 7" class="grid-item">
                <div class="day-num">
                    <div class="date-box" :class="index==3?'active':''">
                    {{index+1}}周
                    </div>
                </div>
            </div>
        </div>
        <div v-if="currentTab==2" class="month-grid">
            <div v-for="(item,index) in 7" class="grid-item">
                <div class="day-num">
                    <div class="date-box" :class="index==3?'active':''">
                    {{index+1}}月
                    </div>
                </div>
            </div>
        </div>
        <div class="content-box">
            <div class="note-list">
                <div v-for="item in 6" class="note-item">
                    今日任务安排
                </div>
            </div>
        </div>
    </div>
</template>

<script type='text/ecmascript-6'>
import DashboardTitle from './DashboardTitle.vue'
  export default {
    components:{
        DashboardTitle
    },
    props:{
        dashboard:{
        type:Object,
        required:true,
        },
        data:{
        type:Object,
        required:true
        }
    },
    data () {
      return {
          weekName: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
          currentTab:0
      }
    },
    created () {
    },
    mounted () {

    },
    methods:{
        titleClick(){

        },
        changeTab(tab){
            this.currentTab=tab;
            this.$emit("query",{type:"day",value:"2017-10-10"});
        }
    }
  }
</script>

<style lang='scss' scoped>
    .note-dashboard-item{
        background-color: #ffffff;
        height: 100%;
        overflow: auto;
        .item-header{
            display: -ms-flexbox;
            display: -moz-box;
            display:-webkit-box;
            display: -webkit-flex;
            display: flex;
            border-bottom: 1px solid #ebeef5;
            box-align:center;
            -moz-box-align:center;
            -webkit-box-align:center;
            -webkit-align-items:center;
            align-items:center;
            padding-right: 10px;
            justify-content: space-between;
            .left{
                display: -ms-flexbox;
                display: -moz-box;
                display:-webkit-box;
                display: -webkit-flex;
                display: flex;
            }
            .tab-item{
                font-size: 18px;
                font-weight: 500;
                padding: 10px;
                cursor: pointer;
                &.active{
                    color: #f08519;
                }
            }
            .more{
                font-size: 16px;
                cursor: pointer;
            }
        }
        .day-grid{
            display: -ms-flexbox;
            display: -moz-box;
            display:-webkit-box;
            display: -webkit-flex;
            display: flex;
            padding: 5px;
            padding-bottom: 5px;
            border-bottom: 1px solid #ebeef5;
            .grid-item{
                -moz-box-flex:1;
                box-flex:1;
                -webkit-box-flex:1;
                -webkit-flex:1;
                flex:1;
                text-align: center;
                .week-name{
                    font-size: 12px;
                    color: #b0b0b0;
                }
                .day-num{
                    margin-top: 5px;
                    font-size: 14px;
                    .date-box{
                        display: inline-block;
                        padding:3px 8px;
                        &.active{
                        background-color: #b0b0b0;
                        color: #ffffff;
                        border-radius: 100%;
                        }
                    }
                }
            }
        }

        .week-grid,.month-grid{
                        display: -ms-flexbox;
            display: -moz-box;
            display:-webkit-box;
            display: -webkit-flex;
            display: flex;
            padding: 5px;
            padding-bottom: 5px;
            border-bottom: 1px solid #ebeef5;
            .grid-item{
                -moz-box-flex:1;
                box-flex:1;
                -webkit-box-flex:1;
                -webkit-flex:1;
                flex:1;
                text-align: center;
                .day-num{
                    margin-top: 5px;
                    font-size: 14px;
                    .date-box{
                        display: inline-block;
                        padding:3px 8px;
                        &.active{
                        background-color: #b0b0b0;
                        color: #ffffff;
                        border-radius: 100%;
                        }
                    }
                }
            }
        }

        .content-box{
            padding: 10px;
            padding-top: 0px;
            .note-list{
                .note-item{
                    padding-bottom: 10px;
                    padding-top: 10px;
                    border-bottom: 1px solid #ebeef5;
                    font-size: 14px;
                }
            }
        }
    }
</style>
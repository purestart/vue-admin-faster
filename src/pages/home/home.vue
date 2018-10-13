/*
* author:詹陈龙
* description:首页
* update:
*/
<template>
    <div class="home-page">
        <div class="step-wraper">
            <vue-step :now-step="nowStep" :step-list="stepList" activeColor="#A56FEE" style-type="style2"></vue-step>
        </div>
        <div class="container">
            <div class="left-box">
                <div class="canlendar-schdule">
                    <div class="header">

                        <i class="el-icon-date" >
                            <el-date-picker
                            @change="changeDatePicker"
                            value-format="yyyy-MM-dd"
                            v-model="pickerDate"
                            style="opacity:0;position:absolute;left:15px;"
                            type="date"
                            placeholder="选择日期">
                            
                            </el-date-picker>

                        </i>
                            <span v-if="schdules.length==7">
                                周计划任务（{{schdules[0].month}}.{{schdules[0].day}}-{{schdules[6].month}}.{{schdules[6].day}}）
                            </span>
                        
                        <span class="right-icon-box">
                            <i @click="getLastWeek" class="el-icon-arrow-left" ></i>
                            <i @click="getNextWeek" class="el-icon-arrow-right" ></i>
                        </span>

                    </div>
                    <div class="schdule-list">

                        <div :key="index" v-for="(item,index) in schdules" class="schdule-item-wraper">
                            <div class="schdule-item">
                                <div class="schdule-left-box">
                                    <div  class="plan-date">
                                        <p class="month">{{weekName[item.week]}}</p>
                                        <p>
                                            <span class="date-font">{{item.day}}.</span><span class="month-font">{{item.month}}月</span>
                                        </p>
                                    </div>
                                    <div class="schdule-title">
                                        {{item.title}}
                                    </div>
                                </div>
                                <div class="schdule-right-box">
                                    <div>{{item.time}}</div>
                                    <div @click="()=>{item.showRemark=!item.showRemark}" class="dot-btn">
                                        <i  :class="item.showRemark==true?'fa-chevron-up':'fa-chevron-down'" class="fold_btn fa" ></i>
                                        
                                    </div>
                                </div>
                            </div>
                            <div :class="item.showRemark==true?'show':''" class="remark ">
                                备注：
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
            <div class="right-box">
                <div class="new-wraper">
                    <el-tabs v-model="activeName">
                        <el-tab-pane :key="item.id" v-for="item in messages" :label="item.label" :name="item.name">
                            <div class="news-container">
                                <div class="left-img">
                                    <img :src="item.img" alt="">
                                    <span class="ng-bing">{{item.imgTitle}}</span>
                                </div>
                                
                                <div class="right-list">
                                    <ul class="news-list">
                                        <li :key="index" v-for="(msg,index) in item.list">
                                            <a @click="toNewsDetail(0,1)" href="javascript:void(0)">{{msg.title}}</a>
                                            <span class="news-time">09-28</span>
                                        </li>
                                    </ul>
                                    <span class="news-more">
                                        <a @click="toNewsList" href="javascript:void(0)">更多></a>
                                    </span>
                                </div>
                            </div>
                            
                        </el-tab-pane>
                        <!-- <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
                        <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
                        <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane> -->
                    </el-tabs>
                </div>
                <div class="chart-wraper">
                    <el-tabs value="sale">
                        <el-tab-pane name="sale" label="月销售情况">
                            <div>
                                <div id="mychart" style="width: 572px;height:220px;">
                                    
                                </div>
                            </div>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </div>
        </div>
    </div>
</template>

<script type='text/ecmascript-6'>
import VueStep from "../../components/vue-step.vue";
export default {
  components: {
    VueStep
  },
  data() {
    return {
      pickerDate: "",
      options: {
        color: ["#3398DB"],
        title: {
          text: "销售额（千万）"
        },
        tooltip: {},
        legend: {
          data: ["销量"]
        },
        xAxis: {
          data: ["一月", "二月", "三月", "四月", "五月", "六月"]
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      },
      activeName: "second",
      nowStep: 2,
      weekName: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
      stepList: ["进度一", "进度二", "F1", "F2", "F3", "F4"],
      messages: [
        {
          id: 0,
          name: "first",
          label: "消息提醒",
          img: "http://onf2hckia.bkt.clouddn.com/pilot.jpg",
          imgTitle: "护照到期提醒",
          list: [
            {
              id: 0,
              title: "消息提醒首页"
            },
            {
              id: 0,
              title: "消息提醒首页"
            },
            {
              id: 0,
              title: "消息提醒首页"
            },
            {
              id: 0,
              title: "消息提醒首页"
            },
            {
              id: 0,
              title: "消息提醒首页"
            },
            {
              id: 0,
              title: "消息提醒首页6"
            },
            {
              id: 0,
              title: "消息提醒首页7"
            }
          ]
        },
        {
          id: 1,
          name: "second",
          label: "重要通知",
          img: "http://onf2hckia.bkt.clouddn.com/pilot.jpg",
          imgTitle: "护照到期提醒",
          list: [
            {
              id: 0,
              title: "消息提醒首页"
            },
            {
              id: 0,
              title: "消息提醒首页"
            },
            {
              id: 0,
              title: "消息提醒首页"
            }
          ]
        },
        {
          id: 2,
          name: "three",
          label: "运行规定",
          img: "http://onf2hckia.bkt.clouddn.com/pilot.jpg",
          imgTitle: "护照到期提醒",
          list: [
            {
              id: 0,
              title: "消息提醒首页"
            },
            {
              id: 0,
              title: "消息提醒首页"
            },
            {
              id: 0,
              title: "消息提醒首页"
            }
          ]
        },
        {
          id: 3,
          name: "four",
          label: "一般通知",
          img: "http://onf2hckia.bkt.clouddn.com/pilot.jpg",
          imgTitle: "护照到期提醒",
          list: [
            {
              id: 0,
              title: "消息提醒首页"
            },
            {
              id: 0,
              title: "消息提醒首页"
            },
            {
              id: 0,
              title: "消息提醒首页"
            }
          ]
        },
        {
          id: 4,
          name: "five",
          label: "操作通告",
          img: "http://onf2hckia.bkt.clouddn.com/pilot.jpg",
          imgTitle: "护照到期提醒",
          list: [
            {
              id: 0,
              title: "消息提醒首页"
            },
            {
              id: 0,
              title: "消息提醒首页"
            },
            {
              id: 0,
              title: "消息提醒首页"
            }
          ]
        }
      ],
      schdules: [
        {
          id: 0,
          week: 2,
          date: "",
          year: 2018,
          month: 9,
          day: 26,
          remark: "",
          time: "08:00-20:00",
          title: "考勤-公务",
          showRemark: false
        },
        {
          id: 1,
          week: 3,
          date: "",
          year: 2018,
          month: 9,
          day: 27,
          remark: "",
          time: "08:00-20:00",
          title: "考勤-公务",
          showRemark: false
        },
        {
          id: 2,
          week: 4,
          date: "",
          year: 2018,
          month: 9,
          day: 28,
          remark: "",
          time: "08:00-20:00",
          title: "考勤-公务",
          showRemark: false
        },
        {
          id: 3,
          week: 5,
          date: "",
          year: 2018,
          month: 9,
          day: 29,
          remark: "",
          time: "08:00-20:00",
          title: "考勤-公务",
          showRemark: false
        },
        {
          id: 4,
          week: 6,
          date: "",
          year: 2018,
          month: 9,
          day: 30,
          remark: "",
          time: "08:00-20:00",
          title: "考勤-公务",
          showRemark: false
        },
        {
          id: 5,
          week: 0,
          date: "",
          year: 2018,
          month: 10,
          day: 1,
          remark: "",
          time: "08:00-20:00",
          title: "考勤-公务",
          showRemark: false
        },
        {
          id: 6,
          week: 1,
          date: "",
          year: 2018,
          month: 10,
          day: 2,
          remark: "",
          time: "08:00-20:00",
          title: "考勤-公务",
          showRemark: false
        }
      ]
    };
  },
  created() {},
  mounted() {
    var myChart = this.$echarts.init(document.getElementById("mychart"));
    myChart.setOption(this.options);
    this.getInitSchedule();
  },
  methods: {
    changeDatePicker(date) {
      //console.log(date);
      let arr = date.split("-");
      //console.log(arr);
      if (arr.length == 3) {
        let year = parseInt(arr[0]);
        let month = parseInt(arr[1]);
        let day = parseInt(arr[2]);
        this.getSchedules(year, month, day);
      }
    },
    getNextWeek() {
      let lastDay = this.schdules[6];
      let year = lastDay.year;
      let month = lastDay.month;
      let day = lastDay.day;
      let lastDateOfMonth = new Date(year, month, 0).getDate();
      if (lastDateOfMonth == day) {
        //最后一天
        if (month == 12) {
          year = year + 1;
          month = 1;
        } else {
          month = month + 1;
        }
        day = 1;
      } else {
        day = day + 1;
      }
      this.getSchedules(year, month, day);
    },
    getLastWeek() {
      let firstDay = this.schdules[0];
      let year = firstDay.year;
      let month = firstDay.month;
      let day = firstDay.day;

      if (day > 7) {
        day = day - 7;
      } else {
        if (month == 1) {
          year = year - 1;
          month = 12;
        } else {
          month = month - 1;
        }
        let lastDateOfMonth = new Date(year, month, 0).getDate();
        day = lastDateOfMonth + (day - 7);
      }
      this.getSchedules(year, month, day);
    },
    getInitSchedule() {
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      this.getSchedules(year, month, day);
    },
    getSchedules(year, month, day) {
      let lastDateOfMonth = new Date(year, month, 0).getDate();
      let tmpSchedules = [];

      let gap = lastDateOfMonth - day;
      if (gap >= 6) {
        //便利当前月的天数 7天
        for (let i = day; i < day + 7; i++) {
          let weekNo = new Date(year, month - 1, i).getDay();
          let item = {
            id: i - day,
            week: weekNo,
            date: "",
            year: year,
            month: month,
            day: i,
            remark: "",
            time: "08:00-20:00",
            title: "考勤-公务",
            showRemark: false
          };
          tmpSchedules.push(item);
        }
      } else {
        //下个月拥有的天数
        let nextNum = 6 - gap;
        //便利当前月的天数

        for (let i = day; i < day + gap + 1; i++) {
          let weekNo = new Date(year, month - 1, i).getDay();
          let item = {
            id: i - day,
            week: weekNo,
            date: "",
            year: year,
            month: month,
            day: i,
            remark: "",
            time: "08:00-20:00",
            title: "考勤-公务",
            showRemark: false
          };
          tmpSchedules.push(item);
        }

        //遍历下个月的天数
        if (month == 12) {
          year = year + 1;
          month = 1;
        } else {
          month = month + 1;
        }
        for (let i = 1; i < nextNum + 1; i++) {
          let weekNo = new Date(year, month - 1, i).getDay();
          let item = {
            id: i - day,
            week: weekNo,
            date: "",
            year: year,
            month: month,
            day: i,
            remark: "",
            time: "08:00-20:00",
            title: "考勤-公务",
            showRemark: false
          };
          tmpSchedules.push(item);
        }
      }
      //console.log(tmpSchedules);

      this.schdules = tmpSchedules;
    },
    toNewsDetail(type, id) {
      this.$router.push({ path: "/news-detail/" + type + "/" + id });
    },
    toNewsList() {
      this.$router.push({ path: "/news-list" });
    }
  }
};
</script>

<style lang='scss' scoped>
.home-page {
   margin: 16px;
  .step-wraper {
    background-color: #fff;
    padding: 16px;
  }

  .container {
    margin-top: 10px;
    display: -ms-flexbox;
    display: -moz-box;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    .left-box {
      -moz-box-flex: 1;
      box-flex: 1;
      -webkit-box-flex: 1;
      -webkit-flex: 1;
      flex: 1;

      .canlendar-schdule {
         position: relative;
        .header {
          background-color: #ed5565;
          color: #fff;
          height: 45px;
          border-radius: 5px;
          line-height: 45px;

          text-align: center;

          .el-icon-date {
            float: left;
            line-height: 45px;
            margin-left: 15px;
          }

          .right-icon-box {
            margin-right: 15px;
            float: right;
            .el-icon-arrow-left {
              font-size: 18px;
            }
            .el-icon-arrow-right {
              font-size: 18px;
              margin-left: 10px;
            }
          }
        }
        .schdule-list {
          .schdule-item-wraper {
            background-color: #fff;
            border-radius: 5px;

            .remark {
              padding-left: 15px;
              padding-right: 15px;
              font-size: 14px;
              border-top: 0px dashed #e4e4e4;
              height: 0px;
              overflow: hidden;
              transition: all 0.5s;

              &.show {
                height: 40px;
                padding-bottom: 10px;
                padding-top: 10px;
                border-top: 1px dashed #e4e4e4;
              }
            }
          }
          .schdule-item {
            margin-top: 11px;
            padding: 10px 15px;

            display: -ms-flexbox;
            display: -moz-box;
            display: -webkit-box;
            display: -webkit-flex;
            display: flex;

            justify-content: space-between;

            .schdule-left-box {
              display: -ms-flexbox;
              display: -moz-box;
              display: -webkit-box;
              display: -webkit-flex;
              display: flex;
              box-align: center;
              -moz-box-align: center;
              -webkit-box-align: center;
              -webkit-align-items: center;
              align-items: center;

              .schdule-title {
                margin-left: 10px;
              }
            }
            .schdule-right-box {
              display: -ms-flexbox;
              display: -moz-box;
              display: -webkit-box;
              display: -webkit-flex;
              display: flex;
              box-align: center;
              -moz-box-align: center;
              -webkit-box-align: center;
              -webkit-align-items: center;
              align-items: center;

              .dot-btn {
                display: inline-block;
                padding: 3px;
                border-radius: 100%;
                background-color: #d20202;
                color: #fff;
                font-size: 14px;
                margin-left: 10px;
              }
            }

            .plan-date {
              width: 55px;
              height: 45px;
              box-sizing: border-box;
              border: 3px solid #ed992e;
              text-align: center;
              .month {
                background-color: #ed992e;
                color: #fff;
              }
              .date-font {
                font-size: 16px;
              }
              .month-font {
                font-size: 12px;
              }
            }
          }
        }
      }
    }
    .right-box {
      -moz-box-flex: 1;
      box-flex: 1;
      -webkit-box-flex: 1;
      -webkit-flex: 1;
      flex: 1;
      margin-left: 10px;

      .new-wraper {
        min-height: 280px;
        background-color: #fff;
        border-radius: 5px;
        padding-bottom: 10px;
        padding-left: 15px;
        padding-right: 15px;

        .news-container {
          display: -ms-flexbox;
          display: -moz-box;
          display: -webkit-box;
          display: -webkit-flex;
          display: flex;
          .left-img {
            img {
              width: 170px;
              height: 190px;
              border: 1px solid #e4e4e4;
            }
            .ng-bing {
              display: block;
              width: 100%;
              height: 25px;
              text-align: center;
              color: #fff;
              line-height: 24px;
              background: rgba(0, 0, 0, 0.3);
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
          .right-list {
            -moz-box-flex: 1;
            box-flex: 1;
            -webkit-box-flex: 1;
            -webkit-flex: 1;
            flex: 1;

            .news-list {
              height: 192px;
              overflow: hidden;
              box-sizing: border-box;

              li {
                height: 32px;
                box-sizing: border-box;
                border-bottom: 1px dashed #e6e6e6;
                padding-left: 10px;
                position: relative;
                padding-top: 4px;
                margin-left: 10px;
                &::before {
                  content: "·";
                  line-height: 20px;
                  font-size: 20px;
                  position: absolute;
                  left: 0;
                }

                a {
                  text-decoration: none;
                  color: #000;
                  font-size: 14px;
                }
                .news-time {
                  float: right;
                  font-size: 12px;
                  padding-top: 4px;
                }
              }
            }

            .news-more {
              line-height: 30px;

              font-size: 12px;
              float: right;
              a {
                text-decoration: none;
                color: #000;
              }
            }
          }
        }
      }

      .chart-wraper {
        min-height: 280px;
        background-color: #fff;
        margin-top: 10px;
        border-radius: 5px;
        padding-bottom: 7px;
        padding-left: 15px;
        padding-right: 15px;
      }
    }
  }
}
</style>
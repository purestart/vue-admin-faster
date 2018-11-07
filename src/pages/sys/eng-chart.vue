/*
* Description:工程线
* Author:
* Update:
*/
<template>
    <div class="eng-chart--container">
        <div class="chart-wrapper">
            <div class="map-box">
                <div id="map-content" class="map-content">

                </div>
            </div>
            <div class="right-box">
                <div class="data-count">
                    <div class="pro-header">
                        项目数据
                    </div>
                    <div class="item-wraper">
                        <div v-for="item in 3" class="item">
                            <div class="label">
                                备案总数
                            </div>
                            <div class="count">
                                11284
                            </div>
                        </div>
                    </div>
                </div>
                <div id="line-chart" class="line-chart">
                </div>
                <div class="flex-box-wraper">
                    
                    <div id="pie-chart" class="pie-chart"></div>
                    <div id="column-chart" class="column-chart"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script type='text/ecmascript-6'>

 import 'echarts/map/js/china.js'
  export default {
    data () {
      return {
          option:{
            title : {
                text: '全国经销商分布图',
                subtext: '数据来自国家统计局'
            },
            tooltip : {
                trigger: 'item'
            },
            legend: {
                x:'right',
                selectedMode:false,
                data:['北京','上海','广东']
            },
            dataRange: {
                orient: 'horizontal',
                min: 0,
                max: 55000,
                text:['高','低'],           // 文本，默认为数值文本
                splitNumber:0
            },
            series : [
                {
                    name: '全国经销商分布图',
                    type: 'map',
                    mapType: 'china',
                    mapLocation: {
                        x: 'left'
                    },
                    selectedMode : 'multiple',
                    itemStyle:{
                        normal:{label:{show:true}},
                        emphasis:{label:{show:true}}
                    },
                    data:[
                        {name:'西藏', value:605.83},
                        {name:'青海', value:1670.44},
                        {name:'宁夏', value:2102.21},
                        {name:'海南', value:2522.66},
                        {name:'甘肃', value:5020.37},
                        {name:'贵州', value:5701.84},
                        {name:'新疆', value:6610.05},
                        {name:'云南', value:8893.12},
                        {name:'重庆', value:10011.37},
                        {name:'吉林', value:10568.83},
                        {name:'山西', value:11237.55},
                        {name:'天津', value:11307.28},
                        {name:'江西', value:11702.82},
                        {name:'广西', value:11720.87},
                        {name:'陕西', value:12512.3},
                        {name:'黑龙江', value:12582},
                        {name:'内蒙古', value:14359.88},
                        {name:'安徽', value:15300.65},
                        {name:'北京', value:16251.93, selected:true},
                        {name:'福建', value:17560.18},
                        {name:'上海', value:19195.69, selected:true},
                        {name:'湖北', value:19632.26},
                        {name:'湖南', value:19669.56},
                        {name:'四川', value:21026.68},
                        {name:'辽宁', value:22226.7},
                        {name:'河北', value:24515.76},
                        {name:'河南', value:26931.03},
                        {name:'浙江', value:32318.85},
                        {name:'山东', value:45361.85},
                        {name:'江苏', value:49110.27},
                        {name:'广东', value:53210.28, selected:true}
                    ]
                }
            ],
            animation: false
         },

         lineOption: {
             title : {
                
                subtext: '合同各月应收及回款趋势'
            },
            tooltip : {
                trigger: 'axis'
            },
            
            calculable : true,
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    data : ['1','2','3','4','5','6','7','8','9','10','11','12']
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [

                {
                    name:'视频广告',
                    type:'line',
                    stack: '总量',
                    itemStyle: {normal: {areaStyle: {type: 'default'}}},
                    data:[150, 232, 201, 154, 190, 330, 410,390,320,290,320,350]
                },
                {
                    name:'直接访问',
                    type:'line',
                    stack: '总量',
                    itemStyle: {normal: {areaStyle: {type: 'default'}}},
                    data:[320, 332, 301, 334, 390, 330, 320,340,360,350,330,300]
                },
                {
                    name:'搜索引擎',
                    type:'line',
                    stack: '总量',
                    itemStyle: {normal: {areaStyle: {type: 'default'}}},
                    data:[820, 932, 901, 934, 1290, 1330, 1320,1230,1130,1000,900,1200]
                }
            ]
            },

            pieOption : {
                title : {
                    subtext: '生产订单状态'
                 },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} ({d}%)"
                },
                calculable : true,
                series : [
                    {
                        name:'访问来源',
                        type:'pie',
                        radius : ['50%', '70%'],
                        itemStyle : {
                            // normal : {
                            //     label : {
                            //         show : false
                            //     },
                            //     labelLine : {
                            //         show : false
                            //     }
                            // },
                            emphasis : {
                                label : {
                                    show : true,
                                    position : 'center',
                                    textStyle : {
                                        fontSize : '16',
                                        fontWeight : 'bold'
                                    }
                                }
                            }
                        },
                        data:[
                            {value:335, name:'直接访问： 335'},
                            {value:310, name:'邮件营销： 335'},
                            {value:234, name:'联盟广告： 234'},
                            {value:135, name:'视频广告： 135'},
                            {value:1548, name:'搜索引擎： 1548'}
                        ]
                    }
                ]
            },
            columnOption : {
                title : {
                    subtext: '经销商合同金额前10排名'
                },
                tooltip : {
                    trigger: 'axis'
                },
                calculable : true,
                xAxis : [
                    {
                        type : 'value',
                        boundaryGap : [0, 0.01]
                    }
                ],
                yAxis : [
                    {
                        type : 'category',
                        data : ['巴西','印尼','美国','印度','中国']
                    }
                ],
                series : [
                    {
                        name:'2011年',
                        type:'bar',
                        data:[18203, 23489, 29034, 104970, 131744]
                    },
                    {
                        name:'2012年',
                        type:'bar',
                        data:[19325, 23438, 31000, 121594, 134141]
                    }
                ]
            }

      }
    },
    created () {
    },
    mounted () {

        var myChart = this.$echarts.init(document.getElementById('map-content'));
        myChart.setOption(this.option, true);
        var lineChart = this.$echarts.init(document.getElementById('line-chart'));
        lineChart.setOption(this.lineOption, true);
        var pieChart = this.$echarts.init(document.getElementById('pie-chart'));
        pieChart.setOption(this.pieOption, true);
        var columnChart = this.$echarts.init(document.getElementById('column-chart'));
        columnChart.setOption(this.columnOption, true);
    },
    methods:{

    }
  }
</script>

<style lang='scss' scoped>
    .eng-chart--container{
        padding:16px;
        margin: 16px;
        background-color: #ffffff;
        .chart-wrapper{
            display: -ms-flexbox;
            display: -moz-box;
            display:-webkit-box;
            display: -webkit-flex;
            display: flex;
            .map-box{
                width: 60%;
                .map-content{
                    height: 600px;
                    min-width: 600px;
                }
            }
            .right-box{
                width: 40%;
                .data-count{
                    .pro-header{
                        color:#f08519;
                        text-align: center;
                        font-size: 18px;
                        padding-bottom: 10px;
                        border-bottom: 3px solid #e4e4e4;
                    }
                    .item-wraper{
                        display: -ms-flexbox;
                        display: -moz-box;
                        display:-webkit-box;
                        display: -webkit-flex;
                        display: flex;
                        .item{
                            -moz-box-flex:1;
                            box-flex:1;
                            -webkit-box-flex:1;
                            -webkit-flex:1;
                            flex:1;
                            text-align: center;
                            .label{
                                color:#f08519;
                                padding: 5px;
                            }
                            .count{
                                color: darkorchid;
                            }
                        }
                    }
                }
                .line-chart{
                    min-height: 300px;
                    
                }
                .flex-box-wraper{
                    display: -ms-flexbox;
                    display: -moz-box;
                    display:-webkit-box;
                    display: -webkit-flex;
                    display: flex;
                     min-height: 200px;
                    .pie-chart{
                        -moz-box-flex:1;
                        box-flex:1;
                        -webkit-box-flex:1;
                        -webkit-flex:1;
                        flex:1;
                        min-height: 200px;
                    }
                    .column-chart{
                        -moz-box-flex:1;
                        box-flex:1;
                        -webkit-box-flex:1;
                        -webkit-flex:1;
                        flex:1;
                        min-height: 200px;
                    }
                }
            }
        }
    }
</style>
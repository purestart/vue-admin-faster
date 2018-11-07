/*
* Description:经销商
* Author:
* Update:
*/
<template>
    <div class="dealer-chart--container">
        <div class="flex-wraper">
            <div :key="item" v-for="item in 4" class="flex-item">
                <div class="img">
                    <img src="../../assets/images/jie_icon.png" alt="">
                </div>
                <div class="content-wraper">
                    <div class="label">商机/项目</div> 
                    <div class="count">100/20</div>
                </div>
            </div>
        </div>
        <div class="line-chart" id="line-chart"></div>
    </div>
</template>

<script type='text/ecmascript-6'>
import 'echarts/theme/macarons';
  export default {
    data () {
      return {
          lineOption: {
             title : {
                
                subtext: '合同各月应收及回款趋势'
            },
            tooltip : {
                trigger: 'axis'
            },
            
            toolbox: {
                show : false,
                feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: false},
                    magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
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
      }
    },
    created () {
    },
    mounted () {
        var lineChart = this.$echarts.init(document.getElementById('line-chart'),'macarons');
        lineChart.setOption(this.lineOption, true);
    },
    methods:{

    }
  }
</script>

<style lang='scss' scoped>
.dealer-chart--container{
    margin: 16px;
    padding: 16px;

    background-color: #fff;
    .flex-wraper{
        display: -ms-flexbox;
        display: -moz-box;
        display:-webkit-box;
        display: -webkit-flex;
        display: flex;
        padding: 0px;
        .flex-item{
            -moz-box-flex:1;
            box-flex:1;
            -webkit-box-flex:1;
            -webkit-flex:1;
            flex:1;
            display: -ms-flexbox;
            display: -moz-box;
            display:-webkit-box;
            display: -webkit-flex;
            display: flex;
            border: 1px solid #e4e4e4;
            margin: 10px;
            padding:10px 5px;
            box-align:center;
            -moz-box-align:center;
            -webkit-box-align:center;
            -webkit-align-items:center;
            align-items:center;
            .img{
                width: 50%;
                img{
                    margin-left: 20px;
                    width: 60px;
                    height: 60px;
                }
            }
            .content-wraper{
                .label{
                    padding-bottom: 10px;
                    font-size: 16px;
                }
                .count{
                    font-size: 20px;
                    font-weight: 600;
                }
            }
        }
    }
    .line-chart{
        min-height: 300px;
    }
}
</style>
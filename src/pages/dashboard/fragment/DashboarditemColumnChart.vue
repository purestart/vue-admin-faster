<template>
    <div class="chart1">
        <dashboard-title :dashboard="dashboard" :more="data && !!data.link" @click="titleClick"></dashboard-title>
        <div ref="chart" id="mychart" >

        </div>
    </div>
</template>

<script>
import DashboardTitle from './DashboardTitle.vue'
  export default {
    props:{
        dashboard:{
            type:Object,
            required:true
        },
        data:{
            type:Object,
            required:true,
            default:{},
        },
        size:{
            type:Object
        }
  },
  components:{
    DashboardTitle
  },
    data () {
      return {
          options:{
            color: ['#3398DB'],
            title: {
                text: '年度销量'
            },
            tooltip: {},
            legend: {
                data:['销量']
            },
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        },
        myChart:null,  
      }
    },
    watch:{
        size:{
            handler(val, old) {
                
                if (this.$refs.chart) {
                    //this.$refs.chart.resize()
                    this.myChart.resize();
                }
            },
            deep:true
        },
    },

    computed:{
    },
    created () {
    },
    mounted () {
        var myChart = this.$echarts.init(document.getElementById('mychart'));
        window.onresize = function(){
            myChart.resize(); 
        }
        myChart.setOption(this.options);
        myChart.resize();

        this.myChart=myChart;

        setTimeout(function(){
            
            myChart.resize(); 
           
        },200)
        
    },
    methods:{
        renderChart(){
            this.myChart.resize()
        },
        titleClick(){

        }
    }
  }
</script>

<style lang='scss' scoped>
    .chart1{
        display:flex;

        -webkit-flex-direction:column;
        flex-direction:column;
        height: 100%;
        background-color: #ffffff;
        #mychart{
            width: 100%;
            -moz-box-flex:1;
            box-flex:1;
            -webkit-box-flex:1;
            -webkit-flex:1;
            flex:1;
        }
    }
</style>
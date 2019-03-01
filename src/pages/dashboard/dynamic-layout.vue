<template>
    <div class="home">
        <grid-layout
            v-if="userDashboard.length"
                 :layout="userDashboard"
                 :col-num="colNum"
                 :row-height="rowHight"
                 :is-draggable="false"
                 :is-resizable="false"
                 :is-mirrored="false"
                 :vertical-compact="true"
                 :use-css-transforms="true"
                 @layout-updated="onLayoutUpdated"
        >
      <grid-item v-for="item in userDashboard"
                 :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i" :key="item.id"
                 dragIgnoreFrom=".ignore">
        <dashboard-item :dashboard="item.dashboard" :size="{w: item.w, h: item.h * rowHight + 10 * (item.h - 1) - 60}"></dashboard-item>
      </grid-item>
    </grid-layout>

    <div :class="['action', {'save': layoutUpdated}]" @click="action">
      <!-- <icon-svg class="icon" name="zonghe"></icon-svg> -->
      <i class="icon el-icon-menu"></i>
      <!-- <cc-icon name="save" class="c-white" v-if="layoutUpdated"></cc-icon> -->
    </div>

    <el-dialog title="请选择要显示的内容" :visible.sync="dialogFormVisible">
        <DashboardSelector @selected="onSelected" ref="DashboardSelector" :value="selected">
        </DashboardSelector>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="getSelectValue">确 定</el-button>
        </div>
    </el-dialog>

    </div>
</template>

<script type='text/ecmascript-6'>
import VueGridLayout from 'vue-grid-layout'
import DashboardItem from './fragment/DashboardItem.vue';
import DashboardSelector from './fragment/DashboardSelector.vue'

  export default {
    components:{
       GridLayout: VueGridLayout.GridLayout,
       GridItem: VueGridLayout.GridItem,
       DashboardItem,
       DashboardSelector
    },
    data () {
      return {
          dialogFormVisible:false,
            rowHight: 30,
            colNum :8,
            userDashboard : [],
            userDashboardClone : [],
            layoutUpdated : false,
      }
    },
    computed:{
        selected () {
            return this.userDashboard.map((userDashboard) => userDashboard.dashboard.id)
        }
    },
    created () {
        this.initData();
    },
    mounted () {

    },
    methods:{
        getSelectValue(){
            this.$refs.DashboardSelector.onSelected();
            this.dialogFormVisible=false;
        },
        async save () {
            const list = []
            this.userDashboard.forEach((userDashboard) => {
            const clone = {...userDashboard}
            clone.dashboardId = userDashboard.dashboard.id
            list.push(clone)
            })

            // const {data} = await this.saveUserDashboard(list)
            const data={success:true}
            if (data) {
            //this.$utils.message('保存成功！')
            this.userDashboardClone = JSON.parse(JSON.stringify(this.userDashboard))
            this.layoutUpdated = false
            }
        },
        async initData () {
            //const {data} = await this.getUserDashboard()

            let {data}=require("./userDashBoard.json");
            // this.$http.get(`./userDashBoard.json`).then(({res}) => {
            //     console.log(res);
            // })
            console.log("getUserDashboard");
            console.log(data);
            
            if (data && data.length) {
            // 返回的是用户的dashboard配置数据，直接赋值给userDashboard
            if (data[0].dashboard) {
                this.userDashboard = data
            } else {
                this.dashboard2UserDashboard(data)
            }
            this.userDashboard.forEach(u => (u.moved = false))
            this.userDashboardClone = JSON.parse(JSON.stringify(this.userDashboard))
            }
        },
        dashboard2UserDashboard (dashboard) {
            this.userDashboard = []
            // 用户没有配置dashboard，后端返回默认的几个dashboard，需要转成userDashboard
            let startX = 0
            let startY = 0
            dashboard.forEach((dashboard, index) => {
            // 先根据类型定义宽和高
            let w = 2
            let h = 3
            if (dashboard.type !== 'info') {
                w = 4
                h = 8
            }
            // 计算位置
            const {x, y} = this.getLocation(startX, startY, w, h)
            this.userDashboard.push({x, y, w, h, i: index + '', dashboard})
            startX = x + w
            startY = y
            })
        },
        // 计算仪表盘的摆放位置的算法：从坐标为0，0的地方开始摆放第一个dashboard，后面的就从紧挨着前一个的位置开始，
        // 以需要摆放的dashboard的宽高构建一个矩形区域，然后判断已经有dashboard和这个区域重叠，如果没有，就可以摆放
        // 如果重叠，那么这个区域往后移动一个坐标，再次判断，直到区域可用
        // 移动的方式是，先沿着x轴移动，x轴不能移动后（x+宽度>总宽度），再往y轴移动
        getLocation (startX, startY, w, h) {
            const userDashboard = this.userDashboard
            if (userDashboard.length) {
            // 看x轴方向是否能往后移动
            if (startX + w > this.colNum) {
                startY++
                startX = 0
            }
            // 判断是否有dashboard和目标位置相交（中心点X的相对距离<宽度和的一半 && 中心点Y点距离<高度和的一半）
            const center = {
                x: startX + w / 2,
                y: startY + h / 2
            }
            const dashboard = userDashboard.find((ud) => {
                const centerTemp = {
                x: ud.x + ud.w / 2,
                y: ud.y + ud.h / 2
                }
                const xl = Math.abs(center.x - centerTemp.x)
                const yl = Math.abs(center.y - centerTemp.y)
                return xl < (w + ud.w) / 2 && yl < (h + ud.h) / 2
            })
            if (dashboard) {
                // 移动一格
                startX++
                return this.getLocation(startX, startY, w, h)
            }
            }
            return {x: startX, y: startY}
        },
    // 所有的
        action () {
            if (this.layoutUpdated) {
                this.save()
            } else {
                console.log(this.selected);
                this.dialogFormVisible=true;
            // 这个方法里注释的部分是为了示范在jsx中使用slot-scope
            // const scopedSlots = {
            //   default: (props) => <div>{props.text}</div>,
            // }
                // this.$utils.dialog(`选择要显示的内容`,
                //     (h) => <DashboardSelector /* scopedSlots={scopedSlots} */ onSelected={this.onSelected} value={this.selected}>
                //     </DashboardSelector>
                // )
            }
        },
        onSelected (dashboards) {
            this.dashboard2UserDashboard(dashboards)
            this.save()
            //this.$utils.hideDialog()
        },
        onLayoutUpdated () {
            if (JSON.stringify(this.userDashboardClone) !== JSON.stringify(this.userDashboard)) {
            this.layoutUpdated = true
            } else {
            this.layoutUpdated = false
            }
        }
    }
  }
</script>

<style lang='scss' scoped>
    .box-wrapper{
        width: 100%;
        border: 1px solid #e4e4e4;
        height: 100%;
    }

      .home {
          margin: 6px 4px;
        .action{
            cursor: pointer;
            position: fixed;
            right: 26px;
            bottom: 16px;
            background-color:#f39c12;
            opacity: 0.2;
            padding: 10px;
            border-radius: 50%;
            transition: all .5s;
            color: #ffffff;
            .icon{
                font-size: 28px;
            }
        }
        .action.save{
        background-color: #F56C6C;
        opacity: 1;
        }
        .action:hover{
        opacity: 1;
        }
  }
</style>
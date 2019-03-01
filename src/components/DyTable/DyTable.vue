
<template>
  <el-table ref="table" :data="rows" v-bind="$attrs"
            v-on="$listeners"
            :row-key="rowKey"
            stripe
            :highlight-current-row="!multi"
            @select="select"
            @select-all="select"
            @row-click="rowClick"
            @current-change="currentChange">
    <el-table-column type="selection" width="55" v-if="multi" />
    <template v-for="(column, index) in columns">
      <el-table-column v-bind="column" :key="index">
        <template slot-scope="scope">
          <dy-render :column="column" :scope="scope"></dy-render>
        </template>
      </el-table-column>
      <!--<el-table-column v-bind="column" v-else/>-->
    </template>
  </el-table>
</template>

<script>

import DyRender from './DyRender.vue'
// @Component({components: {CcRender}})
export default{
  props:{
    rows:{
      type:Array
    },
    rowKey:{
      type:String,
      default:'id'
    },
    columns:{
      type:Array
    },
    multiSelect:{
      type:Boolean
    },
    selectedRows:{
      type:Array
    },
    currentRow:{
      type:Object
    }
  },
  components:{
    DyRender
  },
  /* vue-prop */
  // @Prop() rows
  // @Prop({default: 'id'}) rowKey
  // @Prop() columns
  // @Prop(Boolean) multiSelect // 是否多选
  // @Prop() selectedRows // 选中的行的数组
  // @Prop() currentRow // 当前行
  /* vue-data */
  /* vue-computed */

  computed:{
    multi () {
      return this.multiSelect
    }
  },
  // get multi () {
  //   return this.multiSelect
  // }
  watch:{
    selectedRows(val, old){
      this.$refs.table.clearSelection()
      if (val) {
        this.$nextTick(() => val.forEach((row) => {
          this.$refs.table.toggleRowSelection(row, true)
        }))
      }
    },
    currentRow(val, old){
      if (val) {
        this.$nextTick(() => setTimeout(this.$refs.table.setCurrentRow(val), 0))
      } else {
        this.$nextTick(() => setTimeout(this.$refs.table.setCurrentRow(), 0))
      }
    }
  },
  /**
   * 结合selectionChange方法，实现selectedRows双向绑定
   */
  // @Watch('selectedRows')
  // watchSelectedRows (val, old) {
  //   this.$refs.table.clearSelection()
  //   if (val) {
  //     this.$nextTick(() => val.forEach((row) => {
  //       this.$refs.table.toggleRowSelection(row, true)
  //     }))
  //   }
  // }
  /**
   * 结合currentChange方法，实现currentRow双向绑定
   */
  // @Watch('currentRow')
  // watchCurrentRow (val, old) {
  //   if (val) {
  //     this.$nextTick(() => setTimeout(this.$refs.table.setCurrentRow(val), 0))
  //   } else {
  //     this.$nextTick(() => setTimeout(this.$refs.table.setCurrentRow(), 0))
  //   }
  // }
  methods:{
    currentChange (row) {
      if (row) {
        this.$emit('update:currentRow', row)
      }
    },
    select (rows, row) {
      this.$emit('update:selectedRows', rows)
    },
    // 多选的时候，让点击行的时候，也能选中和取消选中行
    rowClick (row) {
      if (this.multi) {
        const index = this.selectedRows.findIndex((item) => item[this.rowKey] === row[this.rowKey])
        if (index >= 0) {
          this.selectedRows.splice(index, 1)
        } else {
          this.selectedRows.push(row)
        }
      } else {
        this.$emit('single-click')
      }
    },
  //
    toggleRowSelection (rows) {
      rows.forEach((row) => {
        this.$refs.table.toggleRowSelection(row, true)
      })
    }
  }
  
}
</script>

<style lang="scss" scoped>
</style>

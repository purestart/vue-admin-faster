<template>
  <li
    class="el-dropdown-menu__item"
    :class="{
      'is-disabled': disabled,
      'el-dropdown-menu__item--divided': divided
    }"
    @click="handleClick"
    @mouseover="handleMouseOver"
    @mouseout="handleMouseOut"
    :aria-disabled="disabled"
    :tabindex="disabled ? null : -1"
  >
    <slot></slot>
  </li>
</template>
<script>
  import Emitter from 'element-ui/src/mixins/emitter';
  export default {
    name: 'ElDropdownItem',
    mixins: [Emitter],
    props: {
      command: {},
      disabled: Boolean,
      divided: Boolean
    },
    methods: {
      handleClick(e) {
        this.dispatch('ElDropdown', 'menu-item-click', [this.command, this]);
      },
      handleMouseOver(){
          this.$emit("mouseover",false);
      },
      handleMouseOut(){
          this.$emit("mouseout",false);
      }
    }
  };
</script>
<template>
  <button class="table-button" @click="handleClick">
    <div class="table-icon">
      <img src="@/assetslc2/table.svg" alt="" srcset="">
    </div>
    <img src="@/assetslc2/table-drop-ico.svg" alt="" srcset="">
    <div class="option" ref="box" v-if="isShow" @mousemove="handleMove">
      <div class="item" :class="{ isActive: (1 <= flagX && 1 <= flagY) }"></div>
      <div class="item" :class="{ isActive: (2 <= flagX && 1 <= flagY) }"></div>
      <div class="item" :class="{ isActive: (3 <= flagX && 1 <= flagY) }"></div>
      <div class="item" :class="{ isActive: (1 <= flagX && 2 <= flagY) }"></div>
      <div class="item" :class="{ isActive: (2 <= flagX && 2 <= flagY) }"></div>
      <div class="item" :class="{ isActive: (3 <= flagX && 2 <= flagY) }"></div>
      <div class="item" :class="{ isActive: (1 <= flagX && 3 <= flagY) }"></div>
      <div class="item" :class="{ isActive: (2 <= flagX && 3 <= flagY) }"></div>
      <div class="item" :class="{ isActive: (3 <= flagX && 3 <= flagY) }"></div>
    </div>
  </button>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'tableBlock',
  props: {
    editor: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emits }) {
    const box = ref(null)
    const isShow = ref(false)
    const flagX = ref(0)
    const flagY = ref(0)
    const handleMove = (e) => {
      let { x, y } = box.value.getBoundingClientRect()
      flagX.value = Math.ceil((e.x - x) / 30) // 后期改变30就可以
      flagY.value = Math.ceil((e.y - y) / 30)
      // console.log(e.x, e.y, x, y, e.x - x, e.y - y);
    }
    const handleClickOutside = (e) => {
      if(!box.value?.contains(e.target)) {
        isShow.value = false
        removeClickOutside()
      }
    }
    const removeClickOutside = () => {
      window.removeEventListener('click', handleClickOutside)
    }
    const handleClick = (e) => {
      e.stopPropagation();
      if (isShow.value) {
        if(flagX.value && flagY.value) {
          props.editor.chain().focus().insertTable({ rows: flagX.value , cols: flagY.value, withHeaderRow: true }).run()
        }
        flagX.value = 0
        flagY.value = 0
        // 到这里两种情况
        // 1.点了两次表格按钮
        // 2.正常选择了表格的层级创建表格
        // 都需要移除对outside的监听
        removeClickOutside()
      } else {
        // 加入事件监听防止点击该组建外部，关闭表格交互显示
        window.addEventListener('click', handleClickOutside)
      }
      isShow.value = !(isShow.value)
    }

    return {
      isShow,
      handleClick,
      box,
      flagX,
      flagY,
      handleMove,
    }
  }
}
</script>

<style scoped lang="less">
button {
  background: transparent;
  border: none;
  border-radius: .4rem;
  color: #fff;
  cursor: pointer;
  height: 1.75rem;
  padding: .25rem;
  margin-right: .25rem;
  width: 1.75rem;
  position: relative;

  .option {
    position: absolute;
    background: white;
    display: flex;
    left: 0;
    top: 2.00rem;
    z-index: 999;
    width: 90px;
    flex-wrap: wrap;
    border-top: 1px solid #ccc;
    border-left: 1px solid #ccc;
    .item {
      width: 30px;
      height: 30px;
      box-sizing: border-box;
      border-right: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
    }
    .isActive {
      background-color: rgba(32,122,183,.5);
      border-color: rgba(32,122,183,.5);
    }
  }

  &:hover {
    background-color: #d2e4ff;
  }
}

.table-button {
  display: flex;
  width: 2.75rem !important;

  .table-icon {
    display: inline-block;
  }
}
</style>

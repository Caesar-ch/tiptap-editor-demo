<template>
  <div class="home">
    <div ref="bigbox" @mousemove="handleMove" class="table-select-param">
      <div class="musk" ref="musk"></div>
      <div class="item" :class="{isActive: (1 <= flagX && 1 <= flagY) }"></div>
      <div class="item" :class="{isActive: (2 <= flagX && 1 <= flagY)}"></div>
      <div class="item" :class="{isActive: (3 <= flagX && 1 <= flagY)}"></div>
      <div class="item" :class="{isActive: (1 <= flagX && 2 <= flagY)}"></div>
      <div class="item" :class="{isActive: (2 <= flagX && 2 <= flagY)}"></div>
      <div class="item" :class="{isActive: (3 <= flagX && 2 <= flagY)}"></div>
      <div class="item" :class="{isActive: (1 <= flagX && 3 <= flagY)}"></div>
      <div class="item" :class="{isActive: (2 <= flagX && 3 <= flagY)}"></div>
      <div class="item" :class="{isActive: (3 <= flagX && 3 <= flagY)}"></div>
    </div>
    <Taptip></Taptip>
  </div>
</template>

<script>
// @ is an alias to /src
import Taptip from '@/components/Taptip.vue'

export default {
  name: 'HomeView',
  components: {
    Taptip
  },
  data() {
    return {
      bigbox: null,
      musk: null,
      flagX: 0,
      flagY: 0,
    }
  },
  methods: {
    handleMove(e) {
      let {x, y} = this.$refs.bigbox.getBoundingClientRect()
      this.flagX = Math.ceil( (e.x - x) / 30)
      this.flagY = Math.ceil((e.y - y) / 30)
      console.log(e.x, e.y, x, y , e.x- x, e.y -y,this.flagX, this.flagY);
    }
  },
  mounted() {
  },
}
</script>
<style lang="less" scoped>
.table-select-param {
  position: relative;
  margin: 0 auto;
  display: inline-block;
  display: flex;
  width: 90px;
  flex-wrap: wrap;
  .musk {
    background-color: aqua;
    display: inline-block;
    position: absolute;
    top: 0;
    left: 0;
  }
  .item {
    width: 30px;
    height: 30px;
    border: 1px solid blue;
    box-sizing: border-box;
  }
  .isActive {
    background-color: red;
  }
}
</style>
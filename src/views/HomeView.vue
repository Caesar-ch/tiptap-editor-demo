<template>
  <div class="home">
    <div ref="bigbox" @mouseover="handleHover" class="table-select-param">
      <div class="musk" ref="musk"></div>
      <div class="item" :class="{is-active: }"></div>
      <div class="item" :class="{is-active: }"></div>
      <div class="item" :class="{is-active: }"></div>
      <div class="item" :class="{is-active: }"></div>
      <div class="item" :class="{is-active: }"></div>
      <div class="item" :class="{is-active: }"></div>
      <div class="item" :class="{is-active: }"></div>
      <div class="item" :class="{is-active: }"></div>
      <div class="item" :class="{is-active: }"></div>
    </div>
    <img alt="Vue logo" src="../assets/logo.png">
    <!-- <Taptip></Taptip> -->
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
    }
  },
  methods: {
    handleHover(e) {
      // this.$refs.bigbox
      let {x, y} = this.$refs.bigbox.getBoundingClientRect()
      console.log(this.$refs.bigbox, e.x, e.y);
      // this.$refs.musk.style.width = `${e.x - x}px`
      // this.$refs.musk.style.height = `${e.y - y}px`
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
}
</style>
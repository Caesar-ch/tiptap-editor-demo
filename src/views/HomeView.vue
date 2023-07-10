<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
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
  }
}
</script>

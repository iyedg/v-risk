<template>
  <div id="game">
    <player position="d"></player>
    <player position="a"></player>
    <player position="a"></player>
    <player position="a"></player>
    <player position="a"></player>
    <player position="a"></player>
  </div>
</template>

<script>
import Player from '@/components/player'
export default {
  name: 'main',
  components: {Player},
  data () {
    return {
    }
  }
}
</script>
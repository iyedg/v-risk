<template lang="pug">
#game
  player(class="attacker" position="a")
  player(class="defender" position="d")
  .column
    button(@click="playAttack") Attack
    button(@click="blitz") Blitz
</template>

<script>
import Player from '@/components/player'
export default {
  name: 'main',
  components: { Player }
}
</script>

<style lang="sass">

*, *:before, *:after 
  box-sizing: border-box

html, body, #app, #game 
  height: 100%
  margin: 0
  padding: 0
</style>


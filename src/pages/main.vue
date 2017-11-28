<template lang="pug">
#game
  player(class="attacker" position="a" @unitsChange="updateUnits" @diceChange="updateDice")
  player(class="defender" position="d" @unitsChange="updateUnits" @diceChange="updateDice")
  button(@click.native.stop="playAttack") Attack
</template>

<script>
// For now, the logic is based on having only one attacker
// and one defender
// TODO: game logic for multiple named players
// TODO: track attacked countries
// TODO: track number of units in each country

import Player from '@/components/player'
export default {
  name: 'main',
  components: {Player},
  data () {
    return {
      attackerUnits: null,
      attackerDice: null,
      defenderUnits: null,
      defenderDice: null
    }
  },
  methods: {
    updateUnits (e) {
      if (e.position === 'a') {
        this.attackerUnits = e.units
      }
      if (e.position === 'd') {
        this.defenderUnits = e.units
      }
    },
    updateDice (e) {
      if (e.position === 'a') {
        this.attackerDice = e.dice
      }
      if (e.position === 'd') {
        this.defenderDice = e.dice
      }
    }
  }
}
</script>

<style lang="sass">

*, *:before, *:after 
  box-sizing: border-box

html, body, #app, #game 
  height: 100%
  margin: 0
  padding: 0

#game
  flex-direction: row
  display: flex
  color: white
  font-family: sans-serif
  button
    order: 2
    background: turquoise

.attacker
  order: 1
  background: #35235D

.defender
  order: 3  
  background: #CB2402
</style>


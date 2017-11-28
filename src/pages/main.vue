<template lang="pug">
#game
  player(position="a" @unitsChange="updateUnits" @diceChange="updateDice")
  player(position="d" @unitsChange="updateUnits" @diceChange="updateDice")
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

<style lang="sass" scoped>
#game
  display: flex
  flex-direction: row
</style>


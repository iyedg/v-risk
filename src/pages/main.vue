<template lang="pug">
#game
  player(class="attacker" position="a" @unitsChange="updateUnits" @diceChange="updateDice" :units="attackerUnits")
  player(class="defender" position="d" @unitsChange="updateUnits" @diceChange="updateDice" :units="defenderUnits")
  .column
    button(@click="playAttack") Attack
    button(@click="blitz") Blitz
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
      attackerUnits: 2,
      attackerDice: null,
      attackerThrow: null,
      defenderUnits: 2,
      defenderDice: null,
      defenderThrow: null
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
    },
    rollDice (dice) {
      // dice should not be less than 1
      return [...Array(dice).keys()]
      .map(v => Math
        .floor(
          (Math.random() * 6) + 1)
        )
      .sort((a, b) => b - a)
    },
    playAttack () {
      // TODO: focus on one programming style, either methods affect properties
      // or return values
      // An attacker may not attack with units less than 2
      // An attacker may not attack a defender with units less than 1
      if (this.attackerUnits < 2 || this.defenderUnits < 1) {
        alert('An attacker may not attack with units less than 2 or attack a defender with units les than 1')
        return
      }
      // Each player throws the dice
      this.attackerThrow = this.rollDice(this.attackerDice)
      this.defenderThrow = this.rollDice(this.defenderDice)
      // alert('Attacker: ' + this.attackerThrow + '\n Defender: ' + this.defenderThrow)
      // A winner is determined
      // the number of lost units is substracted
      this.compareThrows().map(v => {
        if (v === 1) {
          // number of defender units may not be less than zero
          if (this.defenderUnits > 0) {
            this.defenderUnits -= 1
            this.updateUnits({position: 'd', units: this.defenderUnits})
          }
        } else {
          // number of attacker units may not be less than one
          if (this.attackerUnits > 1) {
            this.attackerUnits -= 1
            this.updateUnits({position: 'a', units: this.attackerUnits})
          }
        }
      })
    },
    blitz () {
      while (this.attackerUnits >= 2 && this.defenderUnits > 0) {
        this.playAttack()
      }
    },
    compareThrows () {
      // * The comparison depends on the number of least dice used by the two players
      // * Reduce the two arrays into an array of 0, 1 where 0
      // means the attacker lost the attack
      // * The attacker wins if and only if their die value
      // is strictly higher than that of the defender and
      // the defender loses one unit
      // else, the attacker loses one units
      if (this.attackerDice >= this.defenderDice) {
        return this.defenderThrow.map((v, i) => v >= this.attackerThrow[i] ? 0 : 1)
      } else {
        return this.attackerThrow.map((v, i) => v > this.defenderThrow[i] ? 1 : 0)
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
  .column
    order: 2
    background: turquoise

.column
  display: flex
  flex-direction: column
  justify-items: space-around

.attacker
  order: 1
  background: #35235D

.defender
  order: 3  
  background: #CB2402
</style>


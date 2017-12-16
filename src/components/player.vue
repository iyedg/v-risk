<template lang="pug">
  .player.side
      h1.title {{ positionString }}
      .controls
        .row
          label(for="numberUnits") Number of units
          input(type="number" v-model.number="currentUnits" :min="constraints(position).minUnits")
        .row
          label(for="numberDice") Number of dice
          input(type="number" v-model.number="currentDice" :min="1" :max="constraints(position).maxDice")

</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    position: {
      type: String,
      default: 'a',
      // A player may be in a position of attack or defense
      validator: v => v === 'a' || v === 'd'
    },
    units: {
      type: Number,
      default: 2
    }
  },
  name: 'player',
  computed: {
    ...mapGetters(['constraints']),
    minUnits () {
      return this.constraints(this.position).minUnits
    },
    minDice () {
      return this.constraints(this.position).minDice
    },
    maxDice () {
      return this.constraints(this.position).maxDice
    },
    currentUnits () {
      return this.constraints(this.position).currentUnits
    },
    currentDice () {
      return this.constraints(this.position).currentDice
    },
    positionString () {
      const positionToString = {
        'a': 'Attacker',
        'd': 'Defender'
      }
      return positionToString[this.position]
    }
  }
}
</script>

<style lang="sass" scoped>
.player 
  display: flex
  flex-direction: column

.row
  display: flex
  flex-direction: row

.column 
  display: flex
  flex-direction: column

.side
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  width: 100%
</style>


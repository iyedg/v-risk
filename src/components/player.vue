<template lang="pug">
  .player.side
      h1.title {{ positionString }}
      .controls
        .row
          label(for="numberUnits") Number of units
          input(type="number" @change="unitsChange" v-model.number="units" :min="minUnits")
        .row
          label(for="numberDice") Number of dice
          input(type="number" v-model.number="dice" min="1" :max="maxDice")

</template>

<script>
// Rules

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
      default: '2'
    }
  },
  data () {
    return {
      intermediateDice: 2
    }
  },
  name: 'player',
  computed: {
    positionString () {
      const positionToString = {
        'a': 'Attacker',
        'd': 'Defender'
      }
      return positionToString[this.position]
    },
    minUnits () {
      // The minimum number of units based on the position of the player
      if (this.position === 'a') {
        // A player may not attack with less than two units
        return 2
      }
      if (this.position === 'd') {
        // A player may not defend with less than one unit
        return 1
      }
    },
    maxDice () {
      // The maximum number of dice a player may use based on their position
      if (this.position === 'a') {
        // A player may not attack with a number of dice larger than three
        return 3
      }
      if (this.position === 'd') {
        // A player may not defend with a number of dice larger than two
        return 2
      }
    },
    dice: {
      // FIXME: an update in number of units should trigger an recomputation of dice
      get () {
        return this.intermediateDice
      },
      set (v) {
        this.intermediateDice = v
        // A player must use at least one die for each play
        if (v <= 1) {
          this.intermediateDice = 1
        }
        // A player may not attack with a number of dice larger than three
        // A player may not defend with a number of dice larger than two
        if (v >= this.maxDice) {
          this.intermediateDice = this.maxDice
        }
        // A player may not attack with a number of dice larger than their current number of units
        // A player may not defend with a number of dice larger than their current number of units
        if (v >= this.units) {
          this.intermediateDice = this.units
        }
        this.$emit('diceChange', {position: this.position, dice: this.intermediateDice})
        return this.intermediateDice
      }
    }
  },
  methods: {
    unitsChange (e) {
      // Trigger a change in the dice computed property
      // to force update based on new value of units
      this.dice = this.intermediateDice
      this.$emit('unitsChange', {position: this.position, units: this.units})
    }
  },
  created () {
    // Emit initial values to parent component
    this.$emit('unitsChange', {position: this.position, units: this.units})
    this.$emit('diceChange', {position: this.position, dice: this.intermediateDice})
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


export default {
  setCurrentUnits (state, {position, units}) {
    if (position === 'a') {
      state.attacker.currentUnits = units
      if (state.attacker.minUnits >= units) {
        state.attacker.currentUnits = state.attacker.minUnits
      }
    }
    if (position === 'd') {
      state.defender.currentUnits = units
      if (state.defender.minUnits >= units) {
        state.defender.currentUnits = state.defender.minUnits
      }
    }
  }
}

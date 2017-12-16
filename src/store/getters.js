export default {
  constraints: (state) => (position) => position === 'a' ? state.attacker : state.defender
}

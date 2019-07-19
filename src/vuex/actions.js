export const login = ({ commit, state }) => {
  commit('login')
}

export const changeRoute = ({ commit, state }, routeName) => {
  commit('changeRoute', routeName)
}

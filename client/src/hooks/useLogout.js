import { useAuthContext } from './useAuthContext'
import { useCardsContext } from './useCardsContext'

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const { dispatch: dispatchCards } = useCardsContext()

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })
    dispatchCards({ type: 'SET_CARDS', payload: null })
  }

  return { logout }
}
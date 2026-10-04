import { useContext } from 'react'
import { CurrentDuoContext } from '../context/CurrentDuoContext.jsx'

/**
 * Gets the current user and duo from anywhere in the app.
 *
 * @example
 * const { currentDuoId } = useCurrentDuo()
 */
export function useCurrentDuo() {
  const context = useContext(CurrentDuoContext)
  if (!context) {
    throw new Error('useCurrentDuo must be used inside <CurrentDuoProvider>.')
  }
  return context
}

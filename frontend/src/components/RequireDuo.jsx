import { Navigate } from 'react-router'
import { useCurrentDuo } from '../hooks/useCurrentDuo.js'

/**
 * Only shows its children once the user has a duo; otherwise sends them to
 * the welcome screen. Wrap any route that needs a duo in this.
 */
export default function RequireDuo({ children }) {
  const { currentDuoId } = useCurrentDuo()
  if (!currentDuoId) {
    return <Navigate to="/" replace />
  }
  return children
}

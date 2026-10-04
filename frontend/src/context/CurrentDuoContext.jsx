import { useEffect, useMemo, useState } from 'react'
import { DEMO_DUO_ID, DEMO_USER_ID } from '../lib/constants.js'
import { CurrentDuoContext } from './currentDuoContext.js'

const USER_STORAGE_KEY = 'doubletake.currentUserId'
const DUO_STORAGE_KEY = 'doubletake.currentDuoId'

/**
 * Reads a saved id from the browser, so a page refresh doesn't log you out.
 */
function readStoredId(key) {
  try {
    const value = window.localStorage.getItem(key)
    return value ? Number(value) : null
  } catch {
    return null
  }
}

/**
 * Saves an id in the browser, or removes it when the id is null.
 */
function writeStoredId(key, id) {
  try {
    if (id === null) {
      window.localStorage.removeItem(key)
    } else {
      window.localStorage.setItem(key, String(id))
    }
  } catch {
    // Storage can be blocked (private browsing). The ids still work in memory.
  }
}

/**
 * Shares the current user and duo with every screen.
 * Wrap the whole app in this once, in main.jsx.
 */
export default function CurrentDuoProvider({ children }) {
  const [currentUserId, setCurrentUserId] = useState(() => readStoredId(USER_STORAGE_KEY))
  const [currentDuoId, setCurrentDuoId] = useState(() => readStoredId(DUO_STORAGE_KEY))

  useEffect(() => {
    writeStoredId(USER_STORAGE_KEY, currentUserId)
  }, [currentUserId])

  useEffect(() => {
    writeStoredId(DUO_STORAGE_KEY, currentDuoId)
  }, [currentDuoId])

  const value = useMemo(
    () => ({
      currentUserId,
      currentDuoId,
      setCurrentUserId,
      setCurrentDuoId,
      /**
       * Uses the seeded demo duo (user 1, duo 1). Handy for demos and testing.
       * @returns {void}
       */
      signInAsDemoDuo() {
        setCurrentUserId(DEMO_USER_ID)
        setCurrentDuoId(DEMO_DUO_ID)
      },
      /**
       * Forgets the current user and duo, so the next visit starts from Welcome.
       * @returns {void}
       */
      signOut() {
        setCurrentUserId(null)
        setCurrentDuoId(null)
      },
    }),
    [currentUserId, currentDuoId],
  )

  return <CurrentDuoContext value={value}>{children}</CurrentDuoContext>
}

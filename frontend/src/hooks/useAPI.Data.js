import { useCallback, useEffect, useState } from 'react'

/**
 * Loads data when a screen opens and tracks loading and error states.
 *
 * Pass a function that returns a promise. If it depends on a value (like a
 * duo id), wrap it in useCallback so it only reloads when that value changes.
 */
export function useApiData(fetcher) {
  const [reloadCount, setReloadCount] = useState(0)
  const [result, setResult] = useState({ fetcher: null, reloadCount: -1, data: null, error: null })

  useEffect(() => {
    // Ignore answers that arrive after the screen closed or the request changed.
    let isCurrent = true
    fetcher().then(
      (data) => {
        if (isCurrent) {
          setResult({ fetcher, reloadCount, data, error: null })
        }
      },
      (error) => {
        if (isCurrent) {
          setResult({ fetcher, reloadCount, data: null, error })
        }
      },
    )
    return () => {
      isCurrent = false
    }
  }, [fetcher, reloadCount])

  /**
   * Loads the data again, e.g. from a "Try again" button.
   */
  const reload = useCallback(() => setReloadCount((count) => count + 1), [])

  const isForThisRequest = result.fetcher === fetcher
  return {
    data: isForThisRequest ? result.data : null,
    error: isForThisRequest ? result.error : null,
    isLoading: !isForThisRequest || result.reloadCount !== reloadCount,
    reload,
  }
}

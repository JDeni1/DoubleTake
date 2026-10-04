import { useCallback, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import Button from '../components/Button.jsx'
import DuoCard from '../components/DuoCard.jsx'
import { IconClose, IconHeart, IconSearch } from '../components/Icons.jsx'
import Logo from '../components/Logo.jsx'
import StatusMessage from '../components/StatusMessage.jsx'
import { useApiData } from '../hooks/useAPIData.js'
import { useCurrentDuo } from '../hooks/useCurrentDuo.js'
import { getDuo, getFeed, swipe } from '../lib/api.js'
import { findSharedInterests, formatDuoNames } from '../lib/format.js'

/**
 * Main screen: one duo at a time, ranked by vibe, with pass and like.
 */
export default function FeedPage() {
  const navigate = useNavigate()
  const { currentDuoId, currentUserId } = useCurrentDuo()
  const [swipedIds, setSwipedIds] = useState([])
  const [isSwiping, setIsSwiping] = useState(false)
  const [swipeError, setSwipeError] = useState('')

  // Load your duo (for shared interests) and the feed at the same time.
  const loadFeed = useCallback(async () => {
    const [myDuo, feed] = await Promise.all([getDuo(currentDuoId), getFeed(currentDuoId)])
    return { myDuo, feed }
  }, [currentDuoId])
  const { data, error, isLoading, reload } = useApiData(loadFeed)

  const currentDuo = data?.feed.find((duo) => !swipedIds.includes(duo.id)) ?? null
  const sharedInterests = currentDuo ? findSharedInterests(data.myDuo.users, currentDuo.users) : []

  /**
   * Sends a like or pass for the duo on screen, then shows the next one.
   * A mutual like opens the match screen.
   */
  async function handleSwipe(decision) {
    setIsSwiping(true)
    setSwipeError('')
    try {
      const result = await swipe({
        fromDuoId: currentDuoId,
        toDuoId: currentDuo.id,
        likedByUserId: currentUserId ?? data.myDuo.users[0].id,
        decision,
      })
      setSwipedIds((ids) => [...ids, currentDuo.id])
      if (result.matched) {
        navigate(`/match/${result.matchId}`, { state: { otherDuo: currentDuo } })
      }
    } catch (swipeFailure) {
      // 409 means this duo was already swiped (e.g. from Search), so skip it.
      if (swipeFailure.status === 409) {
        setSwipedIds((ids) => [...ids, currentDuo.id])
      } else {
        setSwipeError(swipeFailure.message)
      }
    } finally {
      setIsSwiping(false)
    }
  }

  /**
   * Loads a fresh feed from the server.
   * @returns {void}
   */
  function handleRefresh() {
    setSwipedIds([])
    reload()
  }

  return (
    <div className="flex flex-1 flex-col">
      <header className="flex h-16 shrink-0 items-center justify-between pr-3 pl-5">
        <Logo />
        <Link to="/search" aria-label="Search duos" className="flex size-11 items-center justify-center rounded-full bg-surface hover:bg-brand-soft">
          <IconSearch className="size-5" />
        </Link>
      </header>

      {isLoading && <StatusMessage title="Finding duos with your vibe…" isLoading />}

      {error && (
        <StatusMessage title="Couldn't load duos" message={error.message}>
          <Button variant="secondary" onClick={reload}>
            Try again
          </Button>
        </StatusMessage>
      )}

      {data && !currentDuo && (
        <StatusMessage title="You've seen every duo for now" message="Search by vibe to find more, or check back after more duos join.">
          <Button onClick={() => navigate('/search')}>Search duos</Button>
          <Button variant="ghost" onClick={handleRefresh}>
            Refresh
          </Button>
        </StatusMessage>
      )}

      {currentDuo && (
        <div className="flex flex-1 flex-col px-4 pt-1">
          <DuoCard duo={currentDuo} sharedInterests={sharedInterests} />

          {swipeError && (
            <p role="alert" className="mt-3 text-center text-sm text-spark-dark">
              {swipeError}
            </p>
          )}

          <div className="flex flex-1 items-center justify-center gap-7 py-5">
            <button
              type="button"
              onClick={() => handleSwipe('PASS')}
              disabled={isSwiping}
              aria-label={`Pass on ${formatDuoNames(currentDuo.users)}`}
              className="flex size-16 items-center justify-center rounded-full border-[1.5px] border-line bg-surface hover:border-ink disabled:opacity-50"
            >
              <IconClose className="size-[26px]" />
            </button>
            <button
              type="button"
              onClick={() => handleSwipe('LIKE')}
              disabled={isSwiping}
              aria-label={`Like ${formatDuoNames(currentDuo.users)}`}
              className="flex size-[76px] items-center justify-center rounded-full bg-spark text-white shadow-[0_10px_24px_rgba(255,90,121,0.35)] hover:brightness-95 disabled:opacity-50"
            >
              <IconHeart className="size-8" filled />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

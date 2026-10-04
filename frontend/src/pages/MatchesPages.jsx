import { useCallback } from 'react'
import { useNavigate } from 'react-router'
import Button from '../components/Button.jsx'
import PairAvatars from '../components/PairAvatars.jsx'
import StatusMessage from '../components/StatusMessage.jsx'
import { useApiData } from '../hooks/useAPIData.js'
import { useCurrentDuo } from '../hooks/useCurrentDuo.js'
import { getMatches } from '../lib/api.js'
import { formatDuoNames, formatMatchedAt, isNewMatch } from '../lib/format.js'

/**
 * Every duo that liked you back, newest first.
 */
export default function MatchesPage() {
  const navigate = useNavigate()
  const { currentDuoId } = useCurrentDuo()
  const loadMatches = useCallback(() => getMatches(currentDuoId), [currentDuoId])
  const { data: matches, error, isLoading, reload } = useApiData(loadMatches)

  return (
    <div className="flex flex-1 flex-col gap-[18px] px-5 pt-6 pb-6">
      <div className="flex flex-col gap-1.5 px-1">
        <h1 className="font-display text-3xl font-bold tracking-tight">Matches</h1>
        <p className="text-[15px] text-muted">Duos who liked you back.</p>
      </div>

      {isLoading && <StatusMessage title="Loading matches…" isLoading />}

      {error && (
        <StatusMessage title="Couldn't load matches" message={error.message}>
          <Button variant="secondary" onClick={reload}>
            Try again
          </Button>
        </StatusMessage>
      )}

      {matches?.length === 0 && (
        <StatusMessage title="No matches yet" message="Like a few duos. When one likes you back, they'll show up here.">
          <Button onClick={() => navigate('/feed')}>Browse duos</Button>
        </StatusMessage>
      )}

      {matches?.length > 0 && (
        <ul className="flex flex-col gap-2.5">
          {matches.map((match) => (
            <li key={match.id} className="flex items-center gap-3.5 rounded-[20px] bg-surface px-4 py-3.5">
              <PairAvatars users={match.otherDuo.users} size="md" />
              <div className="flex flex-1 flex-col gap-0.5">
                <span className="font-bold">{formatDuoNames(match.otherDuo.users)}</span>
                <span className="text-sm text-muted">{formatMatchedAt(match.createdAt)}</span>
              </div>
              {isNewMatch(match.createdAt) && (
                <span className="rounded-full bg-brand px-2.5 py-1 text-xs font-bold text-white">New</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

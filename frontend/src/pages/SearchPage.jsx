import { useState } from 'react'
import { useNavigate } from 'react-router'
import Button from '../components/Button.jsx'
import DuoListItem from '../components/DuoListItem.jsx'
import SearchBar from '../components/SearchBar.jsx'
import StatusMessage from '../components/StatusMessage.jsx'
import { useCurrentDuo } from '../hooks/useCurrentDuo.js'
import { searchDuos, swipe } from '../lib/api.js'
import { SEARCH_SUGGESTIONS } from '../lib/constants.js'

const INITIAL_SEARCH = { status: 'idle', query: '', results: [], error: '' }


export default function SearchPage() {
  const navigate = useNavigate()
  const { currentDuoId, currentUserId } = useCurrentDuo()
  const [text, setText] = useState('')
  const [search, setSearch] = useState(INITIAL_SEARCH)
  const [likeStates, setLikeStates] = useState({})

  async function runSearch(query) {
    const trimmed = query.trim()
    if (!trimmed) {
      return
    }
    setSearch({ status: 'loading', query: trimmed, results: [], error: '' })
    try {
      const results = await searchDuos(trimmed, currentDuoId)
      setSearch({ status: 'done', query: trimmed, results, error: '' })
    } catch (error) {
      setSearch({ status: 'error', query: trimmed, results: [], error: error.message })
    }
  }


  function handleSuggestion(suggestion) {
    setText(suggestion)
    runSearch(suggestion)
  }

  
  function setLikeState(duoId, state) {
    setLikeStates((current) => ({ ...current, [duoId]: state }))
  }

  
  async function handleLike(duo) {
    setLikeState(duo.id, 'saving')
    try {
      const result = await swipe({
        fromDuoId: currentDuoId,
        toDuoId: duo.id,
        likedByUserId: currentUserId ?? duo.users[0].id,
        decision: 'LIKE',
      })
      setLikeState(duo.id, 'liked')
      if (result.matched) {
        navigate(`/match/${result.matchId}`, { state: { otherDuo: duo } })
      }
    } catch (error) {
      // 409 = already swiped on this duo, so treat it as liked.
      setLikeState(duo.id, error.status === 409 ? 'liked' : 'idle')
    }
  }

  return (
    <div className="flex flex-1 flex-col gap-4 px-5 pt-6 pb-6">
      <div className="flex flex-col gap-1.5 px-1">
        <h1 className="font-display text-3xl font-bold tracking-tight">Search duos</h1>
        <p className="text-[15px] leading-snug text-muted">
          Describe the duo you'd click with. Results are ranked by how closely they match.
        </p>
      </div>

      <SearchBar value={text} onChange={setText} onSubmit={runSearch} isBusy={search.status === 'loading'} />

      <div className="flex flex-wrap gap-2">
        {SEARCH_SUGGESTIONS.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            onClick={() => handleSuggestion(suggestion)}
            className="h-10 rounded-full border-[1.5px] border-line bg-surface px-3.5 text-sm hover:border-brand"
          >
            {suggestion}
          </button>
        ))}
      </div>

      {search.status === 'loading' && <StatusMessage title="Searching…" isLoading />}

      {search.status === 'error' && (
        <StatusMessage title="Search didn't work" message={search.error}>
          <Button variant="secondary" onClick={() => runSearch(search.query)}>
            Try again
          </Button>
        </StatusMessage>
      )}

      {search.status === 'done' && search.results.length === 0 && (
        <StatusMessage title="No duos found" message="Try describing a vibe instead of a name, like “weekend hikers who love ramen.”" />
      )}

      {search.status === 'done' && search.results.length > 0 && (
        <section aria-label="Search results" className="flex flex-col gap-2.5">
          <p className="px-1 text-sm font-semibold text-muted" aria-live="polite">
            {search.results.length} {search.results.length === 1 ? 'duo' : 'duos'} found
          </p>
          <ul className="flex flex-col gap-2.5">
            {search.results.map((duo) => (
              <DuoListItem key={duo.id} duo={duo} likeState={likeStates[duo.id] ?? 'idle'} onLike={() => handleLike(duo)} />
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}

import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router'
import Avatar from '../components/Avatar.jsx'
import Button from '../components/Button.jsx'
import { IconCheck, IconSearch } from '../components/Icons.jsx'
import StatusMessage from '../components/StatusMessage.jsx'
import TopBar from '../components/TopBar.jsx'
import { useApiData } from '../hooks/useApiData.js'
import { useCurrentDuo } from '../hooks/useCurrentDuo.js'
import { createDuo, getUsers } from '../lib/api.js'

/**
 * One selectable person in the friend list.
 */
function FriendOption({ user, isSelected, onSelect }) {
  return (
    <li>
      <button
        type="button"
        aria-pressed={isSelected}
        onClick={onSelect}
        className={`flex min-h-[76px] w-full items-center gap-3.5 rounded-[20px] bg-surface px-4 py-3 text-left transition-colors ${
          isSelected ? 'border-2 border-brand' : 'border-[1.5px] border-line hover:border-brand'
        }`}
      >
        <Avatar user={user} size="md" className="border-0" />
        <span className="flex flex-1 flex-col gap-0.5">
          <span className="font-bold">
            {user.name}, {user.age}
          </span>
          <span className="text-sm text-muted">{user.interests.join(', ')}</span>
        </span>
        {isSelected ? (
          <span className="flex size-[26px] items-center justify-center rounded-full bg-brand text-white">
            <IconCheck className="size-3.5" />
          </span>
        ) : (
          <span className="size-[26px] rounded-full border-2 border-line" />
        )}
      </button>
    </li>
  )
}

/**
 * Sign-up step 2: pick the friend who completes your duo.
 */
export default function CreateDuoPage() {
  const navigate = useNavigate()
  const { currentUserId, setCurrentDuoId } = useCurrentDuo()
  const { data: users, error, isLoading, reload } = useApiData(getUsers)
  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState(null)
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState('')

  if (!currentUserId) {
    return <Navigate to="/profile" replace />
  }

  const searchText = query.trim().toLowerCase()
  const friends = (users ?? []).filter(
    (user) => user.id !== currentUserId && user.name.toLowerCase().includes(searchText),
  )
  const selectedFriend = users?.find((user) => user.id === selectedId) ?? null

  async function handleTeamUp() {
    setIsSaving(true)
    setSaveError('')
    try {
      const duo = await createDuo({ user1Id: currentUserId, user2Id: selectedId, duoBio: '' })
      setCurrentDuoId(duo.id)
      navigate('/duo/setup')
    } catch (saveFailure) {
      setSaveError(saveFailure.message)
      setIsSaving(false)
    }
  }

  return (
    <div className="flex min-h-dvh flex-col">
      <TopBar backTo="/profile" step={2} />

      <div className="flex flex-1 flex-col gap-[18px] px-6 pt-[22px] pb-8">
        <div className="flex flex-col gap-1">
          <h1 className="font-display text-3xl font-bold tracking-tight">Who's your duo?</h1>
          <p className="text-[15px] leading-snug text-muted">Pick the friend you want to go on double dates with.</p>
        </div>

        <div className="relative">
          <label htmlFor="friend-search" className="sr-only">
            Search friends by name
          </label>
          <IconSearch className="pointer-events-none absolute top-[15px] left-4 size-5 text-muted" />
          <input
            id="friend-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by name"
            className="h-[50px] w-full rounded-full border-[1.5px] border-line bg-surface pr-4 pl-[46px] text-base placeholder:text-muted focus:border-brand focus:outline-none"
          />
        </div>

        {isLoading && <StatusMessage title="Loading people…" isLoading />}
        {error && (
          <StatusMessage title="Couldn't load people" message={error.message}>
            <Button variant="secondary" onClick={reload}>
              Try again
            </Button>
          </StatusMessage>
        )}
        {users && friends.length === 0 && (
          <p className="text-[15px] text-muted">No one matches "{query}". Check the spelling or ask your friend to sign up first.</p>
        )}
        {friends.length > 0 && (
          <ul className="flex flex-col gap-2.5">
            {friends.map((user) => (
              <FriendOption key={user.id} user={user} isSelected={user.id === selectedId} onSelect={() => setSelectedId(user.id)} />
            ))}
          </ul>
        )}

        <div className="mt-auto flex flex-col gap-2 pt-4">
          {selectedFriend && (
            <p className="text-sm text-muted">{selectedFriend.name} will appear next to you on every duo card.</p>
          )}
          {saveError && (
            <p role="alert" className="text-sm text-spark-dark">
              {saveError}
            </p>
          )}
          <Button fullWidth disabled={!selectedFriend || isSaving} onClick={handleTeamUp}>
            {selectedFriend ? `Team up with ${selectedFriend.name}` : 'Pick a friend'}
          </Button>
        </div>
      </div>
    </div>
  )
}

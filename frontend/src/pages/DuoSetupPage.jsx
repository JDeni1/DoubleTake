import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router'
import Button from '../components/Button.jsx'
import { TextArea } from '../components/FormFields.jsx'
import { IconSparkle } from '../components/Icons.jsx'
import PairAvatars from '../components/PairAvatars.jsx'
import StatusMessage from '../components/StatusMessage.jsx'
import TopBar from '../components/TopBar.jsx'
import { useApiData } from '../hooks/useAPIData.js'
import { useCurrentDuo } from '../hooks/useCurrentDuo.js'
import { getDuo, updateDuo } from '../lib/api.js'
import { DUO_BIO_MAX_LENGTH, PROMPT_STARTERS } from '../lib/constants.js'
import { formatDuoAges, formatDuoNames } from '../lib/format.js'

/**
 * The bio form. It's a separate component so its `bio` state can start from
 * the loaded duo: the parent gives it `key={duo.id}`, so React creates a fresh
 * form (with fresh starting state) whenever a different duo loads.
 */
function DuoBioForm({ duo, mode }) {
  const navigate = useNavigate()
  const { signOut } = useCurrentDuo()
  const [bio, setBio] = useState(duo.duoBio)
  const [status, setStatus] = useState({ state: 'idle', message: '' })

  /**
   * Adds a sentence starter to the end of the bio.
   */
  function addStarter(starter) {
    setBio((current) => (current.trim() ? `${current.trim()} ${starter}` : starter))
  }

  /**
   * Saves the bio. During sign-up it continues to the feed; on the
   * Your duo tab it stays and shows a confirmation.
   */
  async function handleSubmit(event) {
    event.preventDefault()
    setStatus({ state: 'saving', message: '' })
    try {
      await updateDuo(duo.id, { duoBio: bio.trim() })
      if (mode === 'onboarding') {
        navigate('/feed')
      } else {
        setStatus({ state: 'saved', message: 'Duo profile saved.' })
      }
    } catch (error) {
      setStatus({ state: 'error', message: error.message })
    }
  }

  /**
   * Clears the saved duo and returns to the welcome screen.
   */
  function handleStartOver() {
    signOut()
    navigate('/')
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-5">
      <div className="flex items-center gap-3.5 rounded-3xl bg-surface p-4">
        <PairAvatars users={duo.users} size="lg" />
        <div className="flex flex-col gap-0.5">
          <span className="font-display text-xl font-bold">{formatDuoNames(duo.users)}</span>
          <span className="text-sm text-muted">{formatDuoAges(duo.users)}</span>
        </div>
      </div>

      <TextArea
        id="duo-bio"
        label="Duo bio"
        rows={4}
        value={bio}
        maxLength={DUO_BIO_MAX_LENGTH}
        onChange={(event) => setBio(event.target.value)}
        placeholder="What are you two like together?"
      />

      <p className="flex gap-2.5 text-sm leading-relaxed text-muted">
        <IconSparkle className="mt-0.5 size-5 shrink-0 text-spark" />
        Your bio and interests decide who shows up in your feed, so be specific about what you like.
      </p>

      <div className="flex flex-col gap-2.5">
        <span className="text-sm font-semibold">Need a starting point?</span>
        <div className="flex flex-wrap gap-2">
          {PROMPT_STARTERS.map((starter) => (
            <button
              key={starter}
              type="button"
              onClick={() => addStarter(starter)}
              className="h-10 rounded-full border-[1.5px] border-dashed border-[#A8A1CC] bg-surface px-3.5 text-sm hover:border-brand"
            >
              {starter}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-auto flex flex-col gap-2 pt-4">
        {status.message && (
          <p role={status.state === 'error' ? 'alert' : 'status'} className={`text-center text-sm ${status.state === 'error' ? 'text-spark-dark' : 'text-brand-dark'}`}>
            {status.message}
          </p>
        )}
        <Button type="submit" fullWidth disabled={status.state === 'saving' || !bio.trim()}>
          {mode === 'onboarding' ? 'Go live' : 'Save changes'}
        </Button>
        {mode === 'edit' && (
          <Button variant="ghost" fullWidth onClick={handleStartOver}>
            Start over with a new duo
          </Button>
        )}
      </div>
    </form>
  )
}

/**
 * Sign-up step 3 and the Your duo tab: edit the duo's bio.
 * Routes: /duo/setup (mode "onboarding") and /duo (mode "edit").
 * Loads GET /api/duos/{id}, saves with PUT /api/duos/{id}.
 */
export default function DuoSetupPage({ mode = 'edit' }) {
  const { currentDuoId } = useCurrentDuo()
  const loadDuo = useCallback(() => getDuo(currentDuoId), [currentDuoId])
  const { data: duo, error, isLoading, reload } = useApiData(loadDuo)
  const isOnboarding = mode === 'onboarding'

  return (
    <div className="flex flex-1 flex-col">
      {isOnboarding && <TopBar backTo="/duo/create" step={3} />}

      <div className={`flex flex-1 flex-col gap-5 px-6 pb-8 ${isOnboarding ? 'pt-[22px]' : 'pt-6'}`}>
        <div className="flex flex-col gap-1">
          <h1 className="font-display text-3xl font-bold tracking-tight">{isOnboarding ? 'Your duo profile' : 'Your duo'}</h1>
          <p className="text-[15px] text-muted">
            {isOnboarding ? 'This is what other duos see first.' : 'Update how other duos see you.'}
          </p>
        </div>

        {isLoading && <StatusMessage title="Loading your duo…" isLoading />}
        {error && (
          <StatusMessage title="Couldn't load your duo" message={error.message}>
            <Button variant="secondary" onClick={reload}>
              Try again
            </Button>
          </StatusMessage>
        )}
        {duo && <DuoBioForm key={duo.id} duo={duo} mode={mode} />}
      </div>
    </div>
  )
}

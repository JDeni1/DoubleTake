import { useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router'
import Button from '../components/Button.jsx'
import DuoVenn from '../components/DuoHearts.jsx'
import Logo from '../components/Logo.jsx'
import StatusMessage from '../components/StatusMessage.jsx'
import { useApiData } from '../hooks/useAPIData.js'
import { useCurrentDuo } from '../hooks/useCurrentDuo.js'
import { getDuo } from '../lib/api.js'
import { formatDuoNames } from '../lib/format.js'

export default function MatchPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const otherDuo = location.state?.otherDuo ?? null
  const { currentDuoId } = useCurrentDuo()
  const loadMyDuo = useCallback(() => getDuo(currentDuoId), [currentDuoId])
  const { data: myDuo } = useApiData(loadMyDuo)

  // Opening /match/5 directly (e.g. after a refresh) has no router state.
  if (!otherDuo) {
    return (
      <StatusMessage title="Match details aren't available" message="Open your matches to see every duo you've matched with.">
        <Button onClick={() => navigate('/matches')}>See your matches</Button>
      </StatusMessage>
    )
  }

  return (
    <div className="flex min-h-dvh flex-col bg-ink px-6 pt-7 pb-9 text-white">
      <Logo inverse />

      <div className="flex flex-1 flex-col justify-center gap-8 py-8">
        <DuoVenn leftUsers={myDuo?.users ?? []} rightUsers={otherDuo.users} theme="dark" />
        <div className="flex flex-col gap-3">
          <h1 className="font-display text-[44px] leading-none font-extrabold tracking-tight">It's a Double Take!</h1>
          <p className="text-[17px] leading-relaxed text-[#C9C5E0]">
            You and {formatDuoNames(otherDuo.users)} both said yes. Time to plan the double date.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <Button variant="inverse" fullWidth onClick={() => navigate('/matches')}>
          See your matches
        </Button>
        <Button variant="inverseOutline" fullWidth onClick={() => navigate('/feed')}>
          Keep browsing
        </Button>
      </div>
    </div>
  )
}

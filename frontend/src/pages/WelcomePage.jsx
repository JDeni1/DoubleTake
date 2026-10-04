import { useNavigate } from 'react-router'
import Button from '../components/Button.jsx'
import DuoVenn from '../components/DuoVenn.jsx'
import Logo from '../components/Logo.jsx'
import { useCurrentDuo } from '../hooks/useCurrentDuo.js'

export default function WelcomePage() {
  const navigate = useNavigate()
  const { currentDuoId, signInAsDemoDuo } = useCurrentDuo()

 
  function handleHaveDuo() {
    if (!currentDuoId) {
      signInAsDemoDuo()
    }
    navigate('/feed')
  }

  return (
    <div className="flex min-h-dvh flex-col px-6 pt-7 pb-8">
      <Logo />

      <div className="flex flex-1 flex-col justify-center gap-7 py-8">
        <DuoVenn />
        <div className="flex flex-col gap-3.5">
          <h1 className="font-display text-[38px] leading-[1.05] font-bold tracking-tight">
            Better first dates, with your best friend there too.
          </h1>
          <p className="text-[17px] leading-relaxed text-muted">
            Team up with a friend, find another pair you both like, and plan a double date.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        <Button fullWidth onClick={() => navigate('/profile')}>
          Get started
        </Button>
        <Button variant="ghost" fullWidth onClick={handleHaveDuo}>
          I already have a duo
        </Button>
        <p className="mt-1 text-center text-[13px] text-muted">You must be 18 or older to use DoubleTake.</p>
      </div>
    </div>
  )
}

import { Link } from 'react-router'
import { IconBack } from './Icons.jsx'

/**
 * Header for the sign-up steps: a back link, "Step X of Y" and a progress bar.
 */
export default function TopBar({ backTo, step, totalSteps = 3 }) {
  return (
    <header className="shrink-0">
      <div className="flex h-14 items-center justify-between pr-4 pl-2">
        {backTo ? (
          <Link to={backTo} aria-label="Back" className="flex size-11 items-center justify-center rounded-full hover:bg-surface">
            <IconBack />
          </Link>
        ) : (
          <span className="size-11" />
        )}
        {step && (
          <span className="text-sm font-semibold text-muted">
            Step {step} of {totalSteps}
          </span>
        )}
      </div>
      {step && (
        <div className="grid gap-1.5 px-6" style={{ gridTemplateColumns: `repeat(${totalSteps}, minmax(0, 1fr))` }}>
          {Array.from({ length: totalSteps }, (_, index) => (
            <div key={index} className={`h-[5px] rounded-full ${index < step ? 'bg-brand' : 'bg-line'}`} />
          ))}
        </div>
      )}
    </header>
  )
}

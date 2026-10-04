import { NavLink } from 'react-router'
import { IconCompass, IconHeart, IconSearch, IconUsers } from './Icons.jsx'

/** The four main tabs. Add a tab here and it appears in the nav. */
const TABS = [
  { to: '/feed', label: 'Discover', Icon: IconCompass },
  { to: '/search', label: 'Search', Icon: IconSearch },
  { to: '/matches', label: 'Matches', Icon: IconHeart },
  { to: '/duo', label: 'Your duo', Icon: IconUsers },
]

/**
 * Tab bar at the bottom of the main screens. NavLink marks the current tab
 * for screen readers (aria-current) and lets us style it differently.
 */
export default function BottomNav() {
  return (
    <nav aria-label="Main" className="sticky bottom-0 grid shrink-0 grid-cols-4 border-t border-line bg-surface px-2 pt-2 pb-3.5">
      {TABS.map(({ to, label, Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 text-xs ${isActive ? 'font-bold text-brand-dark' : 'font-medium text-muted hover:text-ink'}`
          }
        >
          {({ isActive }) => (
            <>
              <span className={`flex h-[30px] w-14 items-center justify-center rounded-full ${isActive ? 'bg-brand-soft' : ''}`}>
                <Icon className="size-[22px]" />
              </span>
              {label}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  )
}

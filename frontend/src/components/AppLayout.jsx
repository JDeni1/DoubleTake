import { Outlet } from 'react-router'
import BottomNav from './BottomNav.jsx'

/**
 * Layout for the four main tabs: the current page on top, the tab bar below.
 */
export default function AppLayout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <main className="flex flex-1 flex-col">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  )
}

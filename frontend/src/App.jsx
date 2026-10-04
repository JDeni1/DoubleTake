import { Route, Routes } from 'react-router'
import AppLayout from './components/AppLayout.jsx'
import RequireDuo from './components/RequireDuo.jsx'

import CreateDuoPage from './pages/CreateDuoPage.jsx'
import DuoSetupPage from './pages/DuoSetupPage.jsx'
import FeedPage from './pages/FeedPage.jsx'
import MatchesPage from './pages/MatchesPage.jsx'
import MatchPage from './pages/MatchPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import ProfileSetupPage from './pages/ProfileSetupPage.jsx'
import SearchPage from './pages/SearchPage.jsx'
import WelcomePage from './pages/WelcomePage.jsx'

export default function App() {
  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col bg-canvas">
      <Routes>
        <Route index element={<WelcomePage />} />
        <Route path="profile" element={<ProfileSetupPage />} />
        <Route path="duo/create" element={<CreateDuoPage />} />
        <Route
          path="duo/setup"
          element={
            <RequireDuo>
              <DuoSetupPage mode="onboarding" />
            </RequireDuo>
          }
        />

        <Route
          element={
            <RequireDuo>
              <AppLayout />
            </RequireDuo>
          }
        >
          <Route path="feed" element={<FeedPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="matches" element={<MatchesPage />} />
          <Route path="duo" element={<DuoSetupPage mode="edit" />} />
        </Route>

        <Route
          path="match/:matchId"
          element={
            <RequireDuo>
              <MatchPage />
            </RequireDuo>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  )
}

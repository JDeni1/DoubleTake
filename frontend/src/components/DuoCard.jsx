import { collectInterests, formatDuoAges, formatDuoNames } from '../lib/format.js'
import Chip from './Chip.jsx'
import PhotoPlaceholder from './PhotoPlaceholder.jsx'
import VibeBadge from './VibeBadge.jsx'

/**
 * The big card on the Discover screen: both photos side by side, the vibe
 * badge, names, bio and interests.
 */
export default function DuoCard({ duo, sharedInterests }) {
  const hasShared = sharedInterests.length > 0
  const interests = (hasShared ? sharedInterests : collectInterests(duo.users)).slice(0, 4)

  return (
    <article className="overflow-hidden rounded-[28px] bg-surface shadow-[0_14px_34px_rgba(27,24,56,0.12)]">
      <div className="relative grid h-80 grid-cols-2 gap-[3px] bg-surface">
        {duo.users.map((user) => (
          <PhotoPlaceholder key={user.id} user={user} />
        ))}
        <div className="absolute top-3.5 left-3.5">
          <VibeBadge distance={duo.distance} variant="onPhoto" />
        </div>
      </div>

      <div className="flex flex-col gap-2 px-5 pt-[18px] pb-5">
        <div>
          <h2 className="font-display text-[26px] font-bold tracking-tight">{formatDuoNames(duo.users)}</h2>
          <p className="text-[15px] text-muted">{formatDuoAges(duo.users)}</p>
        </div>
        {duo.duoBio && <p className="text-[15px] leading-relaxed text-ink/85">{duo.duoBio}</p>}
        {interests.length > 0 && (
          <div className="mt-0.5 flex flex-wrap items-center gap-1.5">
            <span className="mr-0.5 text-[13px] text-muted">{hasShared ? 'You both like' : 'Into'}</span>
            {interests.map((interest) => (
              <Chip key={interest} label={interest} />
            ))}
          </div>
        )}
      </div>
    </article>
  )
}

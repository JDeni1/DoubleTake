import { formatDuoNames } from '../lib/format.js'
import { IconCheck, IconHeart } from './Icons.jsx'
import PairAvatars from './PairAvatars.jsx'
import VibeBadge from './VibeBadge.jsx'

/**
 * One search result: avatars, names, bio, vibe badge and a like button.
 */
export default function DuoListItem({ duo, likeState, onLike }) {
  const names = formatDuoNames(duo.users)
  const isLiked = likeState === 'liked'

  return (
    <li className="flex items-center gap-3.5 rounded-[20px] bg-surface py-3.5 pr-3.5 pl-4">
      <PairAvatars users={duo.users} size="sm" />
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="font-bold">{names}</span>
        {duo.duoBio && <span className="truncate text-sm text-muted">{duo.duoBio}</span>}
        <VibeBadge distance={duo.distance} />
      </div>
      <button
        type="button"
        onClick={onLike}
        disabled={likeState !== 'idle'}
        aria-label={isLiked ? `You liked ${names}` : `Like ${names}`}
        className={`flex size-11 shrink-0 items-center justify-center rounded-full transition-colors disabled:cursor-default ${
          isLiked ? 'bg-brand-soft text-brand-dark' : 'bg-spark text-white hover:brightness-95 disabled:opacity-60'
        }`}
      >
        {isLiked ? <IconCheck className="size-4" /> : <IconHeart className="size-5" filled />}
      </button>
    </li>
  )
}

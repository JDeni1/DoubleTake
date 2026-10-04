import { getTintBackgroundClass } from '../lib/tints.js'

/**
 * One half of a duo card: the person's photo, or a tinted panel with their
 * initial until photos exist. Their name sits in a pill at the bottom.
 */
export default function PhotoPlaceholder({ user }) {
  return (
    <div className={`relative flex items-center justify-center overflow-hidden ${getTintBackgroundClass(user.id)}`}>
      {user.imageUrl ? (
        <img src={user.imageUrl} alt={user.name} className="absolute inset-0 size-full object-cover" />
      ) : (
        <span aria-hidden="true" className="font-display text-[76px] font-bold text-ink/70">
          {user.name.charAt(0)}
        </span>
      )}
      <span className="absolute bottom-3 left-3 rounded-full bg-surface px-2.5 py-1 text-[13px] font-semibold">
        {user.name}
      </span>
    </div>
  )
}

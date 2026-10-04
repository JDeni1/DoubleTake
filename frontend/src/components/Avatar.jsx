import { getTintBackgroundClass } from '../lib/tints.js'

/** Width, height and font size for each avatar size. */
const SIZE_CLASSES = {
  sm: 'size-10 text-[15px]',
  md: 'size-12 text-[17px]',
  lg: 'size-[52px] text-[19px]',
}

/**
 * A round photo, or a tinted circle with the person's initial when there's no photo.
 */
export default function Avatar({ user, size = 'md', className = '' }) {
  const shared = `shrink-0 rounded-full border-[3px] border-surface ${SIZE_CLASSES[size]} ${className}`
  if (user.imageUrl) {
    return <img src={user.imageUrl} alt="" className={`${shared} object-cover`} />
  }
  return (
    <span
      aria-hidden="true"
      className={`flex items-center justify-center font-display font-bold text-ink ${getTintBackgroundClass(user.id)} ${shared}`}
    >
      {user.name.charAt(0)}
    </span>
  )
}

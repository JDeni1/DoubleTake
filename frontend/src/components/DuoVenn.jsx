import { useId } from 'react'
import { getTintFillClass } from '../lib/tints.js'

/** Center x of each big circle and of each avatar inside it. */
const LEFT_CIRCLE_X = 118
const RIGHT_CIRCLE_X = 224
const AVATAR_X = { left: [50, 86], right: [258, 294] }

/**
 * The app's signature graphic: two overlapping circles, one per duo, with the
 * overlap filled in pink and a heart in the middle. Used on Welcome and Match.
 * It's decorative, so screen readers skip it; the text around it says the same thing.
 */
export default function DuoVenn({ leftUsers = [], rightUsers = [], theme = 'light' }) {
  // useId gives a unique id, so two of these on one page don't share a clip path.
  const clipId = useId()
  const isDark = theme === 'dark'
  const leftFill = isDark ? '#3A2F86' : '#DCD3FF'
  const rightFill = isDark ? '#5A2C5E' : '#FFD9C7'

  /**
   * Draws one member's avatar circle and initial inside a big circle.
   */
  function renderAvatar(user, x, ringColor) {
    return (
      <g key={user.id}>
        <circle cx={x} cy="115" r="27" strokeWidth="4" stroke={ringColor} className={isDark ? getTintFillClass(user.id) : 'fill-white'} />
        <text x={x} y="123" textAnchor="middle" className="fill-ink font-display text-[22px] font-bold">
          {user.name.charAt(0)}
        </text>
      </g>
    )
  }

  return (
    <svg viewBox="0 0 342 230" className="h-auto w-full max-w-[342px]" aria-hidden="true">
      <defs>
        <clipPath id={clipId}>
          <circle cx={LEFT_CIRCLE_X} cy="115" r="105" />
        </clipPath>
      </defs>
      <circle cx={LEFT_CIRCLE_X} cy="115" r="105" fill={leftFill} />
      <circle cx={RIGHT_CIRCLE_X} cy="115" r="105" fill={rightFill} />
      <circle cx={RIGHT_CIRCLE_X} cy="115" r="105" clipPath={`url(#${clipId})`} className="fill-spark" />
      <path
        transform="translate(159 103)"
        d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z"
        fill="#FFFFFF"
      />
      {leftUsers.slice(0, 2).map((user, index) => renderAvatar(user, AVATAR_X.left[index], leftFill))}
      {rightUsers.slice(0, 2).map((user, index) => renderAvatar(user, AVATAR_X.right[index], rightFill))}
    </svg>
  )
}

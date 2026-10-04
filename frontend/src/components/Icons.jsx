/**
 * Small inline SVG icons. They use `currentColor`, so an icon takes the text
 * color of whatever it sits in (e.g. `text-brand-dark`). Size them with
 * Tailwind classes like `size-5`. They're decorative, so screen readers skip
 * them; the button or link around an icon needs its own label.
 */

/**
 * Shared wrapper for outline icons.
 */
function OutlineIcon({ className = 'size-6', strokeWidth = 2, children }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}

/**
 * Left arrow for back buttons.
 */
export function IconBack({ className }) {
  return (
    <OutlineIcon className={className}>
      <path d="M15 18l-6-6 6-6" />
    </OutlineIcon>
  )
}

/**
 * Right arrow for list rows that open something.
 */
export function IconChevronRight({ className }) {
  return (
    <OutlineIcon className={className}>
      <path d="M9 18l6-6-6-6" />
    </OutlineIcon>
  )
}

/**
 * Magnifying glass for search.
 */
export function IconSearch({ className, strokeWidth }) {
  return (
    <OutlineIcon className={className} strokeWidth={strokeWidth}>
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </OutlineIcon>
  )
}

/**
 * Compass for the Discover tab.
 */
export function IconCompass({ className }) {
  return (
    <OutlineIcon className={className}>
      <circle cx="12" cy="12" r="9.5" />
      <path d="M16.2 7.8l-2.1 6.3-6.3 2.1 2.1-6.3z" />
    </OutlineIcon>
  )
}

/**
 * Heart, outlined or filled.
 */
export function IconHeart({ className = 'size-6', filled = false }) {
  const path = 'M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z'
  if (filled) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d={path} />
      </svg>
    )
  }
  return (
    <OutlineIcon className={className}>
      <path d={path} />
    </OutlineIcon>
  )
}

/**
 * Two people, for the Your duo tab.
 */
export function IconUsers({ className }) {
  return (
    <OutlineIcon className={className}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" />
    </OutlineIcon>
  )
}

/**
 * X mark for the pass button.
 */
export function IconClose({ className }) {
  return (
    <OutlineIcon className={className} strokeWidth={2.2}>
      <path d="M18 6L6 18M6 6l12 12" />
    </OutlineIcon>
  )
}

/**
 * Check mark for selected items.
 */
export function IconCheck({ className }) {
  return (
    <OutlineIcon className={className} strokeWidth={3}>
      <path d="M20 6L9 17l-5-5" />
    </OutlineIcon>
  )
}

/**
 * Four-point sparkle used for vibe matches.
 */
export function IconSparkle({ className = 'size-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" />
    </svg>
  )
}

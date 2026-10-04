/** Heart outline, the same one used in the favicon and welcome illustration. */
const HEART_PATH =
  'M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z'
 
/**
 * DoubleTake logo: two hearts, one pink and one purple (one per duo),
 * next to the wordmark. Colors match the favicon.
 */
export default function Logo({ inverse = false }) {
  return (
    <div className="flex items-center gap-2">
      <svg className="h-6 w-9" viewBox="0 0 36 24" aria-hidden="true">
        <path transform="translate(1 3) rotate(-12 12 11) scale(0.82)" d={HEART_PATH} fill="#FD6985" />
        <path transform="translate(15 3) rotate(12 12 11) scale(0.82)" d={HEART_PATH} fill={inverse ? '#A895FF' : '#896FCC'} />
      </svg>
      <span className={`font-display text-[21px] font-bold tracking-tight ${inverse ? 'text-white' : 'text-ink'}`}>
        DoubleTake
      </span>
    </div>
  )
}

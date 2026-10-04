/**
 * DoubleTake logo: two overlapping rings (two friends) next to the wordmark.
 *
 */
export default function Logo({ inverse = false }) {
  return (
    <div className="flex items-center gap-2">
      <svg className="h-5 w-[30px]" viewBox="0 0 34 22" aria-hidden="true">
        <circle cx="11" cy="11" r="8.5" fill="none" strokeWidth="3" className={inverse ? 'stroke-[#A895FF]' : 'stroke-brand'} />
        <circle cx="23" cy="11" r="8.5" fill="none" strokeWidth="3" className="stroke-spark" />
      </svg>
      <span className={`font-display text-[21px] font-bold tracking-tight ${inverse ? 'text-white' : 'text-ink'}`}>
        DoubleTake
      </span>
    </div>
  )
}

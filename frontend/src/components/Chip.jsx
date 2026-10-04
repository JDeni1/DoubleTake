/**
 * A pill for interests and suggestions.
 * With `onToggle` it's a button you can select; without it, a read-only tag.
 */
export default function Chip({ label, selected = false, onToggle }) {
  if (!onToggle) {
    return (
      <span className="inline-flex h-7 items-center rounded-full bg-canvas px-3 text-[13px] font-semibold">{label}</span>
    )
  }
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onToggle}
      className={`h-10 rounded-full border-[1.5px] px-4 text-[15px] transition-colors ${
        selected ? 'border-brand bg-brand-soft font-semibold text-brand-dark' : 'border-line bg-surface text-ink hover:border-brand'
      }`}
    >
      {label}
    </button>
  )
}

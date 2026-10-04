import { getVibeLabel, getVibeLevel } from '../lib/vibe.js'
import { IconSparkle } from './Icons.jsx'

/**
 * Shows how closely a duo matches yours, based on TiDB's vector distance.
 * Renders nothing when the match isn't close enough to label.
 */
export default function VibeBadge({ distance, variant = 'pill' }) {
  const level = getVibeLevel(distance)
  if (!level) {
    return null
  }
  const label = getVibeLabel(level)

  if (variant === 'onPhoto') {
    return (
      <span className="inline-flex h-8 items-center gap-1.5 rounded-full bg-surface px-3 text-[13px] font-bold">
        <IconSparkle className="size-4 text-spark" />
        {label}
      </span>
    )
  }
  const colors = level === 'strong' ? 'bg-spark-soft text-spark-dark' : 'bg-brand-soft text-brand-dark'
  return (
    <span className={`inline-flex h-6 items-center self-start rounded-full px-2.5 text-xs font-bold ${colors}`}>{label}</span>
  )
}

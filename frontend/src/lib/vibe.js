/**
 * Turns TiDB vector distances into the labels users see.
 * Lower distance means two duos are more alike. These thresholds are a
 * starting guess: adjust them once Val's real seed data is in TiDB.
 */

/** Distances below this show "Strong vibe match". */
export const STRONG_VIBE_MAX_DISTANCE = 0.3

/** Distances below this (and above the strong cutoff) show "Good vibe match". */
export const GOOD_VIBE_MAX_DISTANCE = 0.5

/**
 * Picks the vibe level for a distance.
 */
export function getVibeLevel(distance) {
  if (typeof distance !== 'number') {
    return null
  }
  if (distance < STRONG_VIBE_MAX_DISTANCE) {
    return 'strong'
  }
  if (distance < GOOD_VIBE_MAX_DISTANCE) {
    return 'good'
  }
  return null
}

/**
 * Gets the label text for a vibe level.
 */
export function getVibeLabel(level) {
  return level === 'strong' ? 'Strong vibe match' : 'Good vibe match'
}

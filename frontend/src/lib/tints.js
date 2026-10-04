/**
 * Placeholder colors for people without photos. A user always gets the same
 * tint because it's picked from their id.
 *
 * Tailwind only generates classes it can find written out in full in your
 * code, so these lists spell out every class instead of building them with
 * string templates like `bg-tint-${name}`.
 */

const BACKGROUND_CLASSES = ['bg-tint-lilac', 'bg-tint-peach', 'bg-tint-mint', 'bg-tint-sky', 'bg-tint-butter']
const FILL_CLASSES = ['fill-tint-lilac', 'fill-tint-peach', 'fill-tint-mint', 'fill-tint-sky', 'fill-tint-butter']

/**
 * Picks a list position from an id so the same id always gets the same tint.
 */
function tintIndex(id) {
  return Math.abs(Number(id) || 0) % BACKGROUND_CLASSES.length
}

/**
 * Background class for HTML elements, e.g. "bg-tint-peach".
 */
export function getTintBackgroundClass(id) {
  return BACKGROUND_CLASSES[tintIndex(id)]
}

/**
 * Fill class for SVG shapes, e.g. "fill-tint-peach".
 */
export function getTintFillClass(id) {
  return FILL_CLASSES[tintIndex(id)]
}

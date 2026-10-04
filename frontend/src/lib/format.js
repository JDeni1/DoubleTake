/**
 * Small helpers that turn API data into the text shown on screen.
 * They're plain functions with no React in them, which makes them easy to test.
 */

const ONE_DAY_MS = 24 * 60 * 60 * 1000

/**
 * Joins both members' names, e.g. "Maya and Theo".
 */
export function formatDuoNames(users) {
  return users.map((user) => user.name).join(' and ')
}

/**
 * Lists names with ages, e.g. "Maya, 24 and Theo, 25".
 */
export function formatDuoAges(users) {
  return users.map((user) => `${user.name}, ${user.age}`).join(' and ')
}

/**
 * Collects every interest from a duo's members, without duplicates.
 */
export function collectInterests(users) {
  return [...new Set(users.flatMap((user) => user.interests ?? []))]
}

/**
 * Finds interests both duos have, ignoring upper/lower case.
 */
export function findSharedInterests(myUsers, theirUsers) {
  const mine = new Set(collectInterests(myUsers).map((interest) => interest.toLowerCase()))
  return collectInterests(theirUsers).filter((interest) => mine.has(interest.toLowerCase()))
}

/**
 * Returns midnight at the start of a date, so days can be compared.
 */
function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

/**
 * Describes when a match happened: "Matched today", "Matched yesterday",
 * "Matched on Friday" (this week) or "Matched on Oct 3".
 */
export function formatMatchedAt(isoDate, now = new Date()) {
  const matchedAt = new Date(isoDate)
  const daysAgo = Math.round((startOfDay(now) - startOfDay(matchedAt)) / ONE_DAY_MS)

  if (daysAgo <= 0) {
    return 'Matched today'
  }
  if (daysAgo === 1) {
    return 'Matched yesterday'
  }
  if (daysAgo < 7) {
    return `Matched on ${matchedAt.toLocaleDateString('en-CA', { weekday: 'long' })}`
  }
  return `Matched on ${matchedAt.toLocaleDateString('en-CA', { month: 'short', day: 'numeric' })}`
}

/**
 * Checks whether a match is less than a day old, to show the "New" badge.

 */
export function isNewMatch(isoDate, now = new Date()) {
  return now - new Date(isoDate) < ONE_DAY_MS
}

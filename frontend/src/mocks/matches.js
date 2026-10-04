const HOURS_AGO_26 = new Date(Date.now() - 26 * 60 * 60 * 1000).toISOString()

/**
 * Swipes that already happened, so the demo duo starts with one match.
 */
export const mockSwipes = [
  { fromDuoId: 1, toDuoId: 4, likedByUserId: 1, decision: 'LIKE' },
  { fromDuoId: 4, toDuoId: 1, likedByUserId: 7, decision: 'LIKE' },
]

/**
 * Matches as stored in the database. The smaller duo id is always duo1Id.
 */
export const mockMatches = [{ id: 1, duo1Id: 1, duo2Id: 4, createdAt: HOURS_AGO_26 }]

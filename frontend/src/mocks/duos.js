/**
 * Fake duos as stored in the database (two user IDs plus a bio).
 * The mock API joins in each member's details before returning them,
 * the same way Annie's backend does.
 */
export const mockDuos = [
  { id: 1, user1Id: 1, user2Id: 2, duoBio: "Two friends who will cross town for good dumplings. Looking for a duo who's up for board games after." },
  { id: 2, user1Id: 3, user2Id: 4, duoBio: 'Roommates who never say no to karaoke. Looking for a fun duo to explore new food spots with.' },
  { id: 3, user1Id: 5, user2Id: 6, duoBio: 'Trail runners by day, open-mic regulars by night.' },
  { id: 4, user1Id: 7, user2Id: 8, duoBio: 'Weekend hikers who end every trip with ramen.' },
  { id: 5, user1Id: 9, user2Id: 10, duoBio: 'Climbing gym friends who sing badly in the car.' },
  { id: 6, user1Id: 11, user2Id: 12, duoBio: 'Board game nights, gallery afternoons and too much coffee.' },
]

/**
 * In mock mode these duos have "already liked" everyone,
 * so liking them creates a match. Handy for demoing the match screen.
 */
export const MOCK_DUOS_THAT_LIKE_YOU = [2, 3]

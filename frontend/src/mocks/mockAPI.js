import { ApiError } from '../lib/apiError.js'
import { MOCK_DUOS_THAT_LIKE_YOU, mockDuos } from './duos.js'
import { mockMatches, mockSwipes } from './matches.js'
import { mockUsers } from './users.js'

/**
 * A fake backend that follows docs/api-contract.md: same inputs, same
 * outputs, same error statuses. It keeps data in memory, so it resets when
 * the page reloads. Search uses simple word overlap to imitate TiDB's
 * vector search closely enough for building the UI.
 */

/** Pretend network delay, so loading states are visible while building. */
const FAKE_LATENCY_MS = 300

/** Common words ignored when comparing text. */
const STOP_WORDS = new Set(['a', 'an', 'and', 'the', 'that', 'who', 'with', 'for', 'of', 'to', 'in', 'on', 'duo', 'duos', 'loves', 'love', 'likes', 'like', 'into', 'we', 'our', 'us', 'is', 'are', 'by', 'after', 'then'])

/**
 * Rough synonyms so the suggested searches find something in mock mode.
 * Real TiDB vector search understands meaning, so the backend needs none of this.
 */
const SYNONYMS = {
  outdoorsy: ['hiking', 'climbing', 'trail', 'runners'],
  chill: ['coffee', 'board', 'games'],
  foodies: ['food', 'ramen', 'dumplings'],
  foodie: ['food', 'ramen', 'dumplings'],
  board: ['board', 'games'],
  nights: ['night', 'nights'],
}

/** In-memory copy of the seed data. Changes here are lost on reload. */
const db = {
  users: structuredClone(mockUsers),
  duos: structuredClone(mockDuos),
  swipes: structuredClone(mockSwipes),
  matches: structuredClone(mockMatches),
}

/**
 * Resolves with a copy of the value after a short delay, like a real response.
 * Copying stops pages from accidentally editing the fake database.
 */
function respond(value) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(structuredClone(value)), FAKE_LATENCY_MS)
  })
}

/**
 * Rejects with an ApiError after a short delay, like a real error response.
 */
function fail(status, message) {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new ApiError(status, message)), FAKE_LATENCY_MS)
  })
}

/**
 * Picks the next free id for a table.
 */
function nextId(rows) {
  return Math.max(0, ...rows.map((row) => row.id)) + 1
}

/**
 * Splits text into lowercase keywords, dropping common filler words.
 */
function toKeywords(text) {
  return text
    .toLowerCase()
    .split(/[^a-z]+/)
    .filter((word) => word.length > 2 && !STOP_WORDS.has(word))
}

/**
 * Builds the API's Duo shape from a stored duo row by joining in both members.
 */
function toDuoResponse(row) {
  const members = [row.user1Id, row.user2Id].map((userId) => {
    const user = db.users.find((candidate) => candidate.id === userId)
    return { id: user.id, name: user.name, age: user.age, imageUrl: user.imageUrl, interests: user.interests }
  })
  return { id: row.id, duoBio: row.duoBio, users: members }
}

/**
 * Collects the keywords that describe a duo: its bio plus members' interests.
 */
function duoKeywords(duo) {
  const interestText = duo.users.flatMap((user) => user.interests).join(' ')
  return new Set(toKeywords(`${duo.duoBio} ${interestText}`))
}

/**
 * Adds rough synonyms to a search's keywords (mock mode only).
 */
function expandSynonyms(words) {
  return new Set(words.flatMap((word) => [word, ...(SYNONYMS[word] ?? [])]))
}

/**
 * Fakes a vector distance between two keyword sets. More overlap means a
 * smaller distance, like TiDB's cosine distance.
 */
function fakeDistance(wordsA, wordsB, { start, weight }) {
  const shared = [...wordsA].filter((word) => wordsB.has(word)).length
  const smallerSize = Math.max(1, Math.min(wordsA.size, wordsB.size))
  const overlap = shared / smallerSize
  return Number(Math.min(0.95, Math.max(0.05, start - overlap * weight)).toFixed(2))
}

/** Tuned so the mock feed and search show a mix of strong, good and unlabelled matches. */
const FEED_SCALE = { start: 0.7, weight: 1.3 }
const SEARCH_SCALE = { start: 0.8, weight: 0.75 }

/**
 * Lists the duo ids a duo has already swiped on.
 */
function swipedDuoIds(duoId) {
  return new Set(db.swipes.filter((row) => row.fromDuoId === duoId).map((row) => row.toDuoId))
}

/**
 * GET /api/users
 */
export function getUsers() {
  return respond(db.users)
}

/**
 * POST /api/users
 */
export function createUser(input) {
  if (!input.name?.trim()) {
    return fail(400, 'Name is required.')
  }
  if (!(input.age >= 18)) {
    return fail(400, 'Age must be 18 or older.')
  }
  const user = { ...input, id: nextId(db.users), imageUrl: input.imageUrl ?? null }
  db.users.push(user)
  return respond(user)
}

/**
 * POST /api/duos
 */
export function createDuo(input) {
  if (input.user1Id === input.user2Id) {
    return fail(400, 'A duo needs two different people.')
  }
  const bothExist = [input.user1Id, input.user2Id].every((id) => db.users.some((user) => user.id === id))
  if (!bothExist) {
    return fail(404, 'One of those users does not exist.')
  }
  const row = { id: nextId(db.duos), user1Id: input.user1Id, user2Id: input.user2Id, duoBio: input.duoBio ?? '' }
  db.duos.push(row)
  return respond(toDuoResponse(row))
}

/**
 * GET /api/duos/{id}
 */
export function getDuo(duoId) {
  const row = db.duos.find((duo) => duo.id === duoId)
  return row ? respond(toDuoResponse(row)) : fail(404, `Duo ${duoId} not found.`)
}

/**
 * PUT /api/duos/{id}
 */
export function updateDuo(duoId, changes) {
  const row = db.duos.find((duo) => duo.id === duoId)
  if (!row) {
    return fail(404, `Duo ${duoId} not found.`)
  }
  row.duoBio = changes.duoBio
  return respond(toDuoResponse(row))
}

/**
 * GET /api/duos/{id}/feed
 */
export function getFeed(duoId) {
  const myRow = db.duos.find((duo) => duo.id === duoId)
  if (!myRow) {
    return fail(404, `Duo ${duoId} not found.`)
  }
  const myWords = duoKeywords(toDuoResponse(myRow))
  const alreadySwiped = swipedDuoIds(duoId)

  const feed = db.duos
    .filter((row) => row.id !== duoId && !alreadySwiped.has(row.id))
    .map((row) => {
      const duo = toDuoResponse(row)
      return { ...duo, distance: fakeDistance(myWords, duoKeywords(duo), FEED_SCALE) }
    })
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 20)
  return respond(feed)
}

/**
 * GET /api/duos/search?q=...&duoId=...
 */
export function searchDuos(query, duoId) {
  if (!query?.trim()) {
    return fail(400, 'Type something to search for.')
  }
  const queryWords = expandSynonyms(toKeywords(query))
  const results = db.duos
    .filter((row) => row.id !== duoId)
    .map((row) => {
      const duo = toDuoResponse(row)
      return { ...duo, distance: fakeDistance(queryWords, duoKeywords(duo), SEARCH_SCALE) }
    })
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 10)
  return respond(results)
}

/**
 * POST /api/swipes
 */
export function swipe(input) {
  if (swipedDuoIds(input.fromDuoId).has(input.toDuoId)) {
    return fail(409, "You've already swiped on this duo.")
  }
  db.swipes.push({ ...input })

  const likedBack =
    MOCK_DUOS_THAT_LIKE_YOU.includes(input.toDuoId) ||
    db.swipes.some((row) => row.fromDuoId === input.toDuoId && row.toDuoId === input.fromDuoId && row.decision === 'LIKE')

  if (input.decision !== 'LIKE' || !likedBack) {
    return respond({ matched: false, matchId: null })
  }
  const match = {
    id: nextId(db.matches),
    duo1Id: Math.min(input.fromDuoId, input.toDuoId),
    duo2Id: Math.max(input.fromDuoId, input.toDuoId),
    createdAt: new Date().toISOString(),
  }
  db.matches.push(match)
  return respond({ matched: true, matchId: match.id })
}

/**
 * GET /api/matches/{duoId}
 */
export function getMatches(duoId) {
  const matches = db.matches
    .filter((match) => match.duo1Id === duoId || match.duo2Id === duoId)
    .map((match) => {
      const otherId = match.duo1Id === duoId ? match.duo2Id : match.duo1Id
      const otherRow = db.duos.find((duo) => duo.id === otherId)
      return { id: match.id, otherDuo: toDuoResponse(otherRow), createdAt: match.createdAt }
    })
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  return respond(matches)
}

import { request } from './httpClient.js'
import * as mockApi from '../mocks/mockApi.js'

/**
 * When true, every function below returns fake data from src/mocks instead of
 * calling the backend. Set VITE_USE_MOCKS=false in .env.local once Annie's
 * endpoints are running. Pages never need to change.
 */
export const USE_MOCKS = import.meta.env.VITE_USE_MOCKS !== 'false'

/**
 * Lists every user. Used on the "Who's your duo?" screen.
 * GET /api/users
 */
export function getUsers() {
  return USE_MOCKS ? mockApi.getUsers() : request('/api/users')
}

/**
 * Creates a user from the profile form.
 * POST /api/users
 */
export function createUser(user) {
  return USE_MOCKS ? mockApi.createUser(user) : request('/api/users', { method: 'POST', body: user })
}

/**
 * Creates a duo from two users.
 * POST /api/duos
 */
export function createDuo(duo) {
  return USE_MOCKS ? mockApi.createDuo(duo) : request('/api/duos', { method: 'POST', body: duo })
}

/**
 * Gets one duo with both members' info.
 * GET /api/duos/{id}
 */
export function getDuo(duoId) {
  return USE_MOCKS ? mockApi.getDuo(duoId) : request(`/api/duos/${duoId}`)
}

/**
 * Updates a duo's bio. The backend regenerates the TiDB embedding from it.
 * PUT /api/duos/{id}
 */
export function updateDuo(duoId, changes) {
  return USE_MOCKS
    ? mockApi.updateDuo(duoId, changes)
    : request(`/api/duos/${duoId}`, { method: 'PUT', body: changes })
}

/**
 * Gets duos ranked by vibe (TiDB vector search), closest first.
 * Excludes your own duo and every duo you've already swiped on.
 * GET /api/duos/{id}/feed
 */
export function getFeed(duoId) {
  return USE_MOCKS ? mockApi.getFeed(duoId) : request(`/api/duos/${duoId}/feed`)
}

/**
 * Searches duos with a plain-English description (TiDB vector search).
 * GET /api/duos/search?q=...&duoId=...
 */
export function searchDuos(query, duoId) {
  if (USE_MOCKS) {
    return mockApi.searchDuos(query, duoId)
  }
  const params = new URLSearchParams({ q: query, duoId: String(duoId) })
  return request(`/api/duos/search?${params}`)
}

/**
 * Records a like or pass. Returns whether it created a match.
 * POST /api/swipes
 */
export function swipe(swipeRequest) {
  return USE_MOCKS ? mockApi.swipe(swipeRequest) : request('/api/swipes', { method: 'POST', body: swipeRequest })
}

/**
 * Gets every match for a duo, newest first.
 * GET /api/matches/{duoId}
 */
export function getMatches(duoId) {
  return USE_MOCKS ? mockApi.getMatches(duoId) : request(`/api/matches/${duoId}`)
}

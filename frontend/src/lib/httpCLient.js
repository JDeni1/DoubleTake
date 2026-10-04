import { ApiError } from './apiError.js'

/** Base URL of the Spring Boot API. Set VITE_API_URL in .env.local. */
const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080'

/**
 * Turns a response body into JSON without crashing on empty or non-JSON bodies.
 */
function parseBody(text) {
  if (!text) {
    return null
  }
  try {
    return JSON.parse(text)
  } catch {
    return null
  }
}

/**
 * Sends a request to the backend and returns the parsed JSON body.
 *
 * Every call to Annie's API goes through this one function, so headers,
 * error handling and the base URL live in a single place.
 *
 * @template T
 * @param {string} path Path starting with /api, e.g. "/api/duos/1/feed".
 * @param {{ method?: string, body?: unknown }} [options] HTTP method and JSON body.
 * @returns {Promise<T>} The parsed response body.
 * @throws {ApiError} When the server can't be reached or answers with a 4xx/5xx status.
 */
export async function request(path, { method = 'GET', body } = {}) {
  let response
  try {
    response = await fetch(`${API_URL}${path}`, {
      method,
      headers: body === undefined ? undefined : { 'Content-Type': 'application/json' },
      body: body === undefined ? undefined : JSON.stringify(body),
    })
  } catch {
    throw new ApiError(0, "Can't reach the server. Check that the backend is running.")
  }

  const data = parseBody(await response.text())
  if (!response.ok) {
    throw new ApiError(response.status, data?.error ?? `Request failed with status ${response.status}.`)
  }
  return data
}

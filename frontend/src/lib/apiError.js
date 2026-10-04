/**
 * Error thrown when the backend (or the mock API) answers with an error.
 *
 * The API contract always sends `{ "error": "message" }`, so pages can show
 * `error.message` to the user directly and check `error.status` when they
 * need to react to a specific case, like 409 for a duplicate swipe.
 */
export class ApiError extends Error {
  /**
   * Creates an API error.
   */
  constructor(status, message) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

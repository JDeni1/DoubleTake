/**
 * Error thrown when the backend (or the mock API) answers with an error.
 * Pages can show `error.message` directly and check `error.status`
 * for specific cases, like 409 for a duplicate swipe.
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
import { BIO_MAX_LENGTH, MAX_INTERESTS, MIN_AGE } from './constants.js'

/**
 * Checks the profile form before it's sent, using the same rules as the backend.
 * Returning messages keyed by field name lets each input show its own error.
 */
export function validateProfile(form) {
  const errors = {}
  const age = Number(form.age)

  if (!form.name.trim()) {
    errors.name = 'Enter your first name.'
  }
  if (!form.age || !Number.isInteger(age)) {
    errors.age = 'Enter your age as a whole number.'
  } else if (age < MIN_AGE) {
    errors.age = `You must be ${MIN_AGE} or older to use DoubleTake.`
  }
  if (form.bio.length > BIO_MAX_LENGTH) {
    errors.bio = `Keep your bio under ${BIO_MAX_LENGTH} characters.`
  }
  if (form.interests.length === 0) {
    errors.interests = 'Pick at least one interest.'
  } else if (form.interests.length > MAX_INTERESTS) {
    errors.interests = `Pick up to ${MAX_INTERESTS} interests.`
  }
  if (!form.isAdult) {
    errors.isAdult = 'Confirm that you are 18 or older.'
  }
  return errors
}

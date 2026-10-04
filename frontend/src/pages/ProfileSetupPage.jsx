import { useState } from 'react'
import { useNavigate } from 'react-router'
import Button from '../components/Button.jsx'
import Chip from '../components/Chip.jsx'
import { TextArea, TextField } from '../components/FormFields.jsx'
import TopBar from '../components/TopBar.jsx'
import { useCurrentDuo } from '../hooks/useCurrentDuo.js'
import { createUser } from '../lib/api.js'
import { BIO_MAX_LENGTH, INTEREST_OPTIONS, MAX_INTERESTS } from '../lib/constants.js'
import { validateProfile } from '../lib/validation.js'

/** Starting values for the form. */
const EMPTY_FORM = { name: '', age: '', bio: '', interests: [], isAdult: false }

/**
 * Sign-up step 1: the user's own profile.
 * Route: /profile. Sends POST /api/users, then goes to step 2.
 */
export default function ProfileSetupPage() {
  const navigate = useNavigate()
  const { setCurrentUserId } = useCurrentDuo()
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState('')

  /**
   * Updates one field and keeps the others as they were.
   */
  function updateField(field, value) {
    setForm((previous) => ({ ...previous, [field]: value }))
  }

  /**
   * Adds or removes an interest, up to the maximum allowed.
   */
  function toggleInterest(interest) {
    setForm((previous) => {
      const isPicked = previous.interests.includes(interest)
      if (isPicked) {
        return { ...previous, interests: previous.interests.filter((item) => item !== interest) }
      }
      if (previous.interests.length >= MAX_INTERESTS) {
        return previous
      }
      return { ...previous, interests: [...previous.interests, interest] }
    })
  }

  /**
   * Validates the form, saves the user and moves to "Who's your duo?".
   */
  async function handleSubmit(event) {
    event.preventDefault()
    const validationErrors = validateProfile(form)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) {
      return
    }

    setIsSaving(true)
    setSaveError('')
    try {
      const user = await createUser({
        name: form.name.trim(),
        age: Number(form.age),
        bio: form.bio.trim(),
        interests: form.interests,
        imageUrl: null,
      })
      setCurrentUserId(user.id)
      navigate('/duo/create')
    } catch (error) {
      setSaveError(error.message)
      setIsSaving(false)
    }
  }

  return (
    <div className="flex min-h-dvh flex-col">
      <TopBar backTo="/" step={1} />

      <form onSubmit={handleSubmit} noValidate className="flex flex-1 flex-col gap-5 px-6 pt-[22px] pb-8">
        <div className="flex flex-col gap-1">
          <h1 className="font-display text-3xl font-bold tracking-tight">About you</h1>
          <p className="text-[15px] text-muted">This is your half of the duo card.</p>
        </div>

        <div className="flex gap-3">
          <TextField
            id="name"
            label="First name"
            className="flex-[2]"
            value={form.name}
            onChange={(event) => updateField('name', event.target.value)}
            autoComplete="given-name"
            error={errors.name}
          />
          <TextField
            id="age"
            label="Age"
            className="flex-1"
            type="number"
            inputMode="numeric"
            min="18"
            value={form.age}
            onChange={(event) => updateField('age', event.target.value)}
            error={errors.age}
          />
        </div>

        <TextArea
          id="bio"
          label="Bio"
          value={form.bio}
          maxLength={BIO_MAX_LENGTH}
          onChange={(event) => updateField('bio', event.target.value)}
          placeholder="What should another duo know about you?"
          error={errors.bio}
        />

        <fieldset className="flex flex-col gap-2.5">
          <legend className="flex w-full justify-between text-sm font-semibold">
            Interests
            <span className="font-normal text-muted">Pick up to {MAX_INTERESTS}</span>
          </legend>
          <div className="mt-2.5 flex flex-wrap gap-2">
            {INTEREST_OPTIONS.map((interest) => (
              <Chip
                key={interest}
                label={interest}
                selected={form.interests.includes(interest)}
                onToggle={() => toggleInterest(interest)}
              />
            ))}
          </div>
          {errors.interests && <p className="text-[13px] text-spark-dark">{errors.interests}</p>}
        </fieldset>

        <div className="flex flex-col gap-1">
          <label className="flex items-center gap-2.5 text-[15px]">
            <input
              type="checkbox"
              checked={form.isAdult}
              onChange={(event) => updateField('isAdult', event.target.checked)}
              className="size-[22px] accent-brand"
            />
            I'm 18 or older
          </label>
          {errors.isAdult && <p className="text-[13px] text-spark-dark">{errors.isAdult}</p>}
        </div>

        <div className="mt-auto flex flex-col gap-2 pt-4">
          {saveError && (
            <p role="alert" className="text-center text-sm text-spark-dark">
              {saveError}
            </p>
          )}
          <Button type="submit" fullWidth disabled={isSaving}>
            {isSaving ? 'Saving…' : 'Continue'}
          </Button>
        </div>
      </form>
    </div>
  )
}
import { IconSearch } from './Icons.jsx'

/**
 * A search input with a round submit button. Using a <form> means pressing
 * Enter on the keyboard searches too.
 *
 * @param {object} props
 * @param {string} props.value Current text.
 * @param {(value: string) => void} props.onChange Called on every keystroke.
 * @param {(value: string) => void} props.onSubmit Called when the user searches.
 * @param {boolean} [props.isBusy=false] Disables the button while a search runs.
 * @returns {JSX.Element}
 */
export default function SearchBar({ value, onChange, onSubmit, isBusy = false }) {
  /**
   * Stops the page from reloading (a form's default) and runs the search.
   * @param {import('react').FormEvent<HTMLFormElement>} event
   * @returns {void}
   */
  function handleSubmit(event) {
    event.preventDefault()
    onSubmit(value)
  }

  return (
    <form role="search" onSubmit={handleSubmit} className="flex items-center gap-2">
      <label htmlFor="duo-search" className="sr-only">
        Describe a duo
      </label>
      <input
        id="duo-search"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="e.g. duo that loves hiking and karaoke"
        className="h-[52px] min-w-0 flex-1 rounded-full border-[1.5px] border-line bg-surface px-[18px] text-base placeholder:text-muted focus:border-brand focus:outline-none"
      />
      <button
        type="submit"
        disabled={isBusy || !value.trim()}
        aria-label="Search"
        className="flex size-[52px] shrink-0 items-center justify-center rounded-full bg-brand text-white hover:bg-brand-dark disabled:opacity-50"
      >
        <IconSearch className="size-[22px]" strokeWidth={2.2} />
      </button>
    </form>
  )
}

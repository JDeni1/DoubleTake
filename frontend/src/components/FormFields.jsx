/**
 * Labelled form inputs that match the UI kit. Every field has a real <label>
 * and shows its error message underneath, linked with aria-describedby so
 * screen readers read the error too.
 */

const INPUT_CLASSES =
  'w-full rounded-[14px] border-[1.5px] bg-surface px-4 text-base text-ink placeholder:text-muted focus:border-brand focus:outline-none'

/**
 * Picks the border color: red-ish when there's an error, grey otherwise.}
 */
function borderClass(error) {
  return error ? 'border-spark-dark' : 'border-line'
}

/**
 * Single-line text input with a label.
 * Any other prop (value, onChange, type, inputMode...) goes to the <input>.
 */
export function TextField({ id, label, error, className = '', ...inputProps }) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label htmlFor={id} className="text-sm font-semibold">
        {label}
      </label>
      <input
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`h-[50px] ${INPUT_CLASSES} ${borderClass(error)}`}
        {...inputProps}
      />
      {error && (
        <p id={`${id}-error`} className="text-[13px] text-spark-dark">
          {error}
        </p>
      )}
    </div>
  )
}

/**
 * Multi-line text input with a label and a character counter.
 */
export function TextArea({ id, label, value, maxLength, error, rows = 3, ...textareaProps }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold">
        {label}
      </label>
      <textarea
        id={id}
        rows={rows}
        value={value}
        maxLength={maxLength}
        aria-invalid={Boolean(error)}
        aria-describedby={`${id}-count${error ? ` ${id}-error` : ''}`}
        className={`resize-none py-3 leading-normal ${INPUT_CLASSES} ${borderClass(error)}`}
        {...textareaProps}
      />
      <div className="flex justify-between gap-3 text-[13px]">
        <span id={`${id}-error`} className="text-spark-dark">
          {error}
        </span>
        <span id={`${id}-count`} className="shrink-0 text-muted">
          {value.length} / {maxLength}
        </span>
      </div>
    </div>
  )
}

/**
 * A centered message for loading, empty and error states, with an optional
 * action (like a "Try again" button) passed as children.
 */
export default function StatusMessage({ title, message, isLoading = false, children }) {
  return (
    <div role={isLoading ? 'status' : undefined} className="flex flex-1 flex-col items-center justify-center gap-3 px-8 py-16 text-center">
      <h2 className="font-display text-2xl font-bold">{title}</h2>
      {message && <p className="max-w-xs text-[15px] leading-relaxed text-muted">{message}</p>}
      {children && <div className="mt-3 flex flex-col items-center gap-2">{children}</div>}
    </div>
  )
}

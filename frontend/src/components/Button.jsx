/** Classes for each button style, from the UI kit. */
const VARIANT_CLASSES = {
  primary: 'bg-brand text-white hover:bg-brand-dark',
  secondary: 'border-[1.5px] border-line bg-surface text-ink hover:border-brand',
  ghost: 'text-brand-dark hover:text-ink',
  inverse: 'bg-white text-ink hover:bg-brand-soft',
  inverseOutline: 'border-[1.5px] border-[#6C6890] text-white hover:border-white',
}

/**
 * Pill-shaped button for every main action.
 * Any other prop (onClick, disabled, type, aria-label...) is passed to the <button>.
 */
export default function Button({ variant = 'primary', fullWidth = false, type = 'button', className = '', children, ...rest }) {
  return (
    <button
      type={type}
      className={`inline-flex h-14 items-center justify-center gap-2 rounded-full px-7 text-[17px] font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${fullWidth ? 'w-full' : ''} ${VARIANT_CLASSES[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}

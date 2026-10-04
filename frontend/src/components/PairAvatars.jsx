import { formatDuoNames } from '../lib/format.js'
import Avatar from './Avatar.jsx'

/** How far the second avatar overlaps the first, per size. */
const OVERLAP_CLASSES = { sm: '-ml-3', md: '-ml-4', lg: '-ml-4' }

/**
 * Both members of a duo as two overlapping avatars.
 *
 * @param {object} props
 * @param {{ id: number, name: string, imageUrl?: string|null }[]} props.users The duo's two members.
 * @param {'sm'|'md'|'lg'} [props.size='md']
 * @returns {JSX.Element}
 */
export default function PairAvatars({ users, size = 'md' }) {
  return (
    <span role="img" aria-label={formatDuoNames(users)} className="flex shrink-0">
      {users.map((user, index) => (
        <Avatar key={user.id} user={user} size={size} className={index > 0 ? OVERLAP_CLASSES[size] : ''} />
      ))}
    </span>
  )
}

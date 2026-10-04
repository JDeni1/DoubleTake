import { useNavigate } from 'react-router'
import Button from '../components/Button.jsx'
import StatusMessage from '../components/StatusMessage.jsx'

/**
 * Shown for any address that doesn't match a route.
 */
export default function NotFoundPage() {
  const navigate = useNavigate()
  return (
    <div className="flex min-h-dvh flex-col">
      <StatusMessage title="This page doesn't exist" message="Check the address, or head back to the start.">
        <Button onClick={() => navigate('/')}>Go to the start</Button>
      </StatusMessage>
    </div>
  )
}

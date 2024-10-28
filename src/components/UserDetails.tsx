import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { User } from '../types/user'

interface UserDetailsProps {
  users: User[]
}

const UserDetails: React.FC<UserDetailsProps> = ({ users }) => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const user = users.find((user) => user.id === Number(id))

  if (!user) {
    return <p>User not found</p>
  }

  return (
    <div>
      <h2>PERSONAL DATA</h2>
      <p>
        <strong>NAME:</strong> {user.username}
      </p>
      <p>
        <strong>EMAIL:</strong> {user.email}
      </p>
      <p>
        <strong>WALLET:</strong> {user.address}
      </p>
      <button
        className='bg-orange-500 text-white rounded-full px-6 py-2 mt-4'
        onClick={() => navigate(-1)}
      >
        Go Back
      </button>{' '}
    </div>
  )
}

export default UserDetails

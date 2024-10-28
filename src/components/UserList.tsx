import React from 'react'
import { Link } from 'react-router-dom'
import { User } from '../types/user'

interface UserListProps {
  users: User[]
  onDelete: (id: number) => void
}

const UserList: React.FC<UserListProps> = ({ users, onDelete }) => {
  return (
    <div className='mt-4'>
      <h2 className='text-orange-500'>Users</h2>
      <table className='min-w-full bg-transparent'>
        <thead>
          <tr className='border-b border-white'>
            <th className='text-white'>Name</th>
            <th className='text-white'>Email</th>
            <th className='text-white'>Wallet</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className='border-b border-white'>
              <td
                className={`py-2 px-4 ${
                  user.isNew ? 'text-orange-500' : 'text-white'
                }`}
              >
                {user.isNew ? (
                  user.username
                ) : (
                  <Link to={`/user/${user.id}`} className='text-white'>
                    {user.username}
                  </Link>
                )}
              </td>
              <td
                className={`py-2 px-4 ${
                  user.isNew ? 'text-orange-500' : 'text-white'
                }`}
              >
                {user.isNew ? (
                  user.email
                ) : (
                  <Link to={`/user/${user.id}`} className='text-white '>
                    {user.email}
                  </Link>
                )}
              </td>
              <td
                className={`py-2 px-4 ${
                  user.isNew ? 'text-orange-500' : 'text-white'
                }`}
              >
                {user.isNew ? (
                  user.address
                ) : (
                  <Link to={`/user/${user.id}`} className='text-white'>
                    {user.address}
                  </Link>
                )}
              </td>
              {user.isNew && (
                <td className='py-2 px-4'>
                  <button
                    onClick={() => onDelete(user.id)}
                    className='text-white  rounded px-2 py-1'
                  >
                    X
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserList

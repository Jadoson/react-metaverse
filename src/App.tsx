import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ConnectWallet from './components/ConnectWallet'
import RegistrationForm from './components/RegistrationForm'
import UserList from './components/UserList'
import UserDetails from './components/UserDetails'
import { fetchAllUsers } from './api/api'
import { User } from './types/user'
import './App.css'

function App() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [users, setUsers] = useState<User[]>([])
  const [isUsersLoaded, setIsUsersLoaded] = useState(false)
  const [registeredUser, setRegisteredUser] = useState<User | null>(null)
  const [isAddedToTable, setIsAddedToTable] = useState(false)

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const apiData = await fetchAllUsers()
        setUsers(apiData.items)
        setIsUsersLoaded(true)
      } catch (error) {
        console.error('Error loading users:', error)
      }
    }
    if (!isUsersLoaded) loadUsers()
  }, [isUsersLoaded])

  const handleConnect = (address: string | null) => {
    setWalletAddress(address)
  }

  const handleRegister = (username: string, email: string) => {
    if (!walletAddress) {
      alert('Please connect your wallet first.')
      return
    }

    const newUser: User = {
      id: users.length + 1,
      username,
      email,
      address: walletAddress,
      isNew: true,
    }
    setRegisteredUser(newUser)
    setIsAddedToTable(false)
  }

  const handleAddToTable = () => {
    if (registeredUser && !isAddedToTable) {
      setUsers([registeredUser, ...users])
      setIsAddedToTable(true)
    }
  }

  const handleDelete = (id: number) => {
    setUsers(users.filter((user) => user.id !== id))
    setRegisteredUser(null)
  }

  return (
    <Router>
      <div className='app-container'>
        <header className='header font-bold'>
          {!walletAddress ? (
            <ConnectWallet onConnect={handleConnect} />
          ) : (
            <p className='mb-2 text-orange-500'>{walletAddress}</p>
          )}
        </header>

        <div className='background-container flex'>
          <div className='content-container flex-grow'>
            <Routes>
              <Route
                path='/'
                element={
                  <div className='flex space-x-8'>
                    <div className='registration-section w-1/2 lg:w-1/3 text-left space-y-4'>
                      <h1 className='text-2xl font-bold text-orange-500 mb-4 '>
                        BETA TEST REGISTRATION
                      </h1>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat.
                      </p>
                      {!registeredUser ? (
                        <RegistrationForm
                          onRegister={handleRegister}
                          walletAddress={walletAddress}
                        />
                      ) : (
                        <div>
                          <h3 className='text-xl font-semibold'>
                            Registered User:
                          </h3>
                          <p>
                            <strong>NAME</strong>
                          </p>
                          <p className='text-orange-500'>
                            <strong>{registeredUser.username}</strong>
                          </p>
                          <p>
                            <strong>EMAIL:</strong> {registeredUser.email}
                          </p>
                          {!isAddedToTable && (
                            <button
                              onClick={handleAddToTable}
                              className='bg-orange-500 text-white rounded-full px-6 py-2 mt-4'
                            >
                              Add to Table
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                    {registeredUser && (
                      <div className='user-list-section w-1/2'>
                        <h2 className='text-xl font-bold text-white mb-4'>
                          PARTICIPATION LISTING (ENABLE ONLY FOR PARTICIPANTS)
                        </h2>
                        <UserList users={users} onDelete={handleDelete} />
                      </div>
                    )}
                  </div>
                }
              />
              <Route path='/user/:id' element={<UserDetails users={users} />} />
            </Routes>
          </div>
          <div className='roadmap-stats w-1/3 text-right p-4 space-y-4'>
            <h2 className='text-xl text-center font-bold text-white'>
              ROADMAP STATS
            </h2>
            <h2 className='text-l text-center font-bold text-orange-500'>
              12,345
            </h2>
            <h3 className='text-l text-center font-bold text-white'>
              LOREM IPSUM DOLOR
            </h3>
            <hr className='border-t border-white my-2' />
            <h2 className='text-l text-center font-bold text-orange-500'>
              12,345
            </h2>
            <h3 className='text-l text-center font-bold text-white'>
              LOREM IPSUM DOLOR
            </h3>
            <hr className='border-t border-white my-2' />
            <h2 className='text-l text-center font-bold text-orange-500'>
              12,345
            </h2>
            <h3 className='text-l text-center font-bold text-white'>
              LOREM IPSUM DOLOR
            </h3>
          </div>
        </div>
      </div>
    </Router>
  )
}

export default App

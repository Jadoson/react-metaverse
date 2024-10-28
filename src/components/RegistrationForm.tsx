import React, { useState } from 'react'

interface RegistrationFormProps {
  onRegister: (username: string, email: string) => void
  walletAddress: string | null
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onRegister }) => {
  const [username, setUsername] = useState<string>('')
  const [email, setEmail] = useState<string>('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (username && email) {
      onRegister(username, email)
      setUsername('')
      setEmail('')
    } else {
      alert('Please fill in all fields.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <div>
        <label className='block text-white'>Username:</label>
        <input
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className='bg-transparent border border-white text-white rounded-full px-4 py-2 w-full'
          placeholder='Enter your username'
          required
        />
      </div>
      <div>
        <label className='block text-white'>Email:</label>
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='bg-transparent border border-white text-white k rounded-full px-4 py-2 w-full'
          placeholder='Enter your email'
          required
        />
      </div>
      <button
        type='submit'
        className='bg-orange-500 text-white rounded-full px-6 py-2 mt-4'
      >
        Register
      </button>
    </form>
  )
}

export default RegistrationForm

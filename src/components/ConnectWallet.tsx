import React from 'react'
import { ethers } from 'ethers'

interface ConnectWalletProps {
  onConnect: (account: string | null) => void
}

const ConnectWallet: React.FC<ConnectWalletProps> = ({ onConnect }) => {
  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum)
        const accounts = await provider.send('eth_requestAccounts', [])
        onConnect(accounts[0])
      } catch (error) {
        console.error('Error connecting to wallet:', error)
        onConnect(null)
      }
    } else {
      alert('MetaMask is not installed.')
    }
  }

  return (
    <button
      onClick={connectWallet}
      className='bg-orange-500 text-white rounded-full px-6 py-2 mt-4'
    >
      Connect Wallet
    </button>
  )
}

export default ConnectWallet

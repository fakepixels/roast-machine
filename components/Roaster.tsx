'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Coins, ArrowDown } from "lucide-react"
import WalletWrapper from './WalletButton'
import { useAccount } from 'wagmi'

export function WalletRoasterSkeuomorphic() {
  const [walletAddress, setWalletAddress] = useState('')
  const [roast, setRoast] = useState('')
  const [isVending, setIsVending] = useState(false)
  const [coinInserted, setCoinInserted] = useState(false)
  const { address } = useAccount()

  const roasts = [
    "Wow, your wallet's so empty, it's applying for food stamps!",
    "I've seen more action in a retirement home than in your transaction history.",
    "Your wallet address is longer than the list of smart decisions you've made.",
    "If your crypto strategy was a movie, it'd be called 'Honey, I Shrunk the Portfolio'.",
    "Your wallet's so inactive, it's been mistaken for a buried time capsule.",
  ]

  useEffect(() => {
    if (address) {
      setWalletAddress(address)
    } else {
      setWalletAddress('')  // Clear the field when address is undefined or null
    }
  }, [address])

  useEffect(() => {
    if (isVending) {
      const timer = setTimeout(() => {
        const randomRoast = roasts[Math.floor(Math.random() * roasts.length)]
        setRoast(randomRoast)
        setIsVending(false)
        setCoinInserted(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [isVending])

  const handleInsertCoin = () => {
    if (walletAddress.length !== 42 || !walletAddress.startsWith('0x')) {
      alert('Please connect your wallet or enter a valid Ethereum wallet address')
      return
    }
    setCoinInserted(true)
  }

  const handleVend = () => {
    setIsVending(true)
    setRoast('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-700 to-gray-900 flex items-center justify-center p-4 relative">
      <div className="absolute top-4 right-4">
        <WalletWrapper />
      </div>
      <div className="w-full max-w-md bg-gradient-to-b from-gray-300 to-gray-400 rounded-xl shadow-2xl overflow-hidden border-4 border-gray-600">
        <div className="bg-gradient-to-r from-red-600 to-red-700 p-4 text-white text-center font-bold text-2xl shadow-md border-b-4 border-red-800">
          Wallet Roaster 3000
        </div>
        <div className="p-6 space-y-6">
          <div className="bg-black rounded-lg p-4 shadow-inner border-2 border-gray-600">
            <Input
              type="text"
              placeholder="Enter wallet address"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              className="w-full border-2 border-gray-700 bg-green-200 text-black placeholder-gray-600 font-mono"
              readOnly={!!address}
            />
          </div>
          <div className="flex justify-between items-center">
            <div className="relative">
              <div className="w-20 h-32 bg-gray-700 rounded-t-lg shadow-lg flex flex-col items-center justify-start pt-2 border-2 border-gray-800">
                <div className="w-14 h-2 bg-black mb-2"></div>
                <Button
                  onClick={handleInsertCoin}
                  className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-3xl font-bold shadow-lg hover:bg-yellow-300 transition-colors duration-200 border-4 border-yellow-500"
                  aria-label="Insert coin"
                >
                  <Coins className="w-10 h-10 text-yellow-600" />
                </Button>
              </div>
              <ArrowDown className="w-6 h-6 text-white absolute -bottom-7 left-1/2 transform -translate-x-1/2" />
            </div>
            <Button 
              onClick={handleVend} 
              disabled={!coinInserted || isVending} 
              className={`w-24 h-24 rounded-full shadow-lg text-lg font-semibold ${coinInserted ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-gray-400 text-gray-600'} transition-colors duration-200 border-4 ${coinInserted ? 'border-red-600' : 'border-gray-500'}`}
            >
              {isVending ? 'Vending...' : 'PUSH'}
            </Button>
          </div>
          <div className="bg-black rounded-lg p-4 h-48 flex items-center justify-center shadow-inner relative overflow-hidden border-4 border-gray-700">
            {isVending ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
              </div>
            ) : roast ? (
              <p className="text-center px-4 text-lg font-medium text-green-500 font-mono">{roast}</p>
            ) : (
              <p className="text-center px-4 text-green-500 font-mono">Your roast will appear here</p>
            )}
            {isVending && (
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-green-500 opacity-30 animate-pulse"></div>
            )}
          </div>
        </div>
        <div className="bg-gray-800 p-4 text-center text-sm text-gray-300 border-t-4 border-gray-600">
          Insert coin, then push button to vend your roast!
        </div>
      </div>
    </div>
  )
}
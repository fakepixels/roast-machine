'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Coins, ArrowDown } from "lucide-react"
import WalletWrapper from './WalletButton'
import { useAccount } from 'wagmi'
import { Footer } from './Footer'  // Make sure this import is present
import { DM_Sans } from 'next/font/google'

const dmSans = DM_Sans({ subsets: ['latin'] })

export function WalletRoasterSkeuomorphic() {
  const [walletAddress, setWalletAddress] = useState('')
  const [roast, setRoast] = useState('')
  const [isVending, setIsVending] = useState(false)
  const [coinInserted, setCoinInserted] = useState(false)
  const { address } = useAccount()

  useEffect(() => {
    if (address) {
      setWalletAddress(address)
    } else {
      setWalletAddress('')  // Clear the field when address is undefined or null
    }
  }, [address])

  const handleInsertCoin = () => {
    if (walletAddress.length !== 42 || !walletAddress.startsWith('0x')) {
      alert('Please connect your wallet or enter a valid Ethereum wallet address')
      return
    }
    setCoinInserted(true)
  }

  const handleVend = async () => {
    setIsVending(true)
    setRoast('')

    try {
      // Step 1: Call the Wallet history API
      const historyResponse = await fetch('/api/wallet-history', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          address: walletAddress,
        }),
      });

      if (!historyResponse.ok) {
        throw new Error('Failed to fetch wallet history');
      }

      const historyData = await historyResponse.json();

      // Step 2 & 3: Send to ChatGPT and get roast
      const roastResponse = await fetch('/api/generate-roast', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ walletHistory: historyData }),
      });

      if (!roastResponse.ok) {
        const errorData = await roastResponse.json();
        throw new Error(errorData.error || 'Failed to generate roast');
      }

      const roastData = await roastResponse.json();
      setRoast(roastData.roast);
    } catch (error) {
      console.error('Error during vending process:', error);
      setRoast('Oops! The roast machine broke. Try again later!');
    } finally {
      setIsVending(false);
      setCoinInserted(false);
    }
  }

  const handleReset = () => {
    setWalletAddress('')
    setRoast('')
    setCoinInserted(false)
  }

  const isResetActive = roast !== ''

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-between">
      <div className="flex-grow flex items-center justify-center p-4 relative">
        <div className="absolute top-4 right-4">
          <WalletWrapper />
        </div>
        <div className="w-full max-w-md bg-gradient-to-b from-gray-300 to-gray-400 rounded-xl shadow-2xl overflow-hidden border-4 border-[#10378a]">
          <div className={`${dmSans.className} bg-gradient-to-r from-[#0052FF] to-[#5388fc] p-4 text-white text-center font-bold text-2xl shadow-md border-b-4 border-[#10378a]`}>
            Wallet Roaster
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
                <ArrowDown className="w-6 h-6 text-gray-700 absolute -bottom-6 left-1/2 transform -translate-x-1/2" />
              </div>
              <div className="w-8"></div>
              <div className="flex space-x-4">
                <Button 
                  onClick={handleReset}
                  disabled={!isResetActive}
                  className={`w-24 h-24 rounded-full shadow-lg text-lg font-semibold ${isResetActive ? 'bg-yellow-600 hover:bg-yellow-700 text-white' : 'bg-gray-400 text-gray-600'} transition-colors duration-200 border-4 ${isResetActive ? 'border-yellow-700' : 'border-gray-500'}`}
                >
                  RESET
                </Button>
                <Button 
                  onClick={handleVend} 
                  disabled={!coinInserted || isVending} 
                  className={`w-24 h-24 rounded-full shadow-lg text-lg font-semibold ${coinInserted ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-gray-400 text-gray-600'} transition-colors duration-200 border-4 ${coinInserted ? 'border-red-600' : 'border-gray-500'}`}
                >
                  {isVending ? 'Vending...' : 'PUSH'}
                </Button>
              </div>
            </div>
            <div className="bg-black rounded-lg p-4 h-48 flex items-center justify-center shadow-inner relative overflow-hidden border-4 border-gray-700">
              {isVending ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="mb-4 w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
                </div>
              ) : roast ? (
                <p className="text-center px-4 text-sm font-medium text-green-500 font-mono">{roast}</p>
              ) : (
                <p className="text-center px-4 text-sm text-green-500 font-mono">Your roast will appear here</p>
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
      <Footer />
    </div>
  )
}
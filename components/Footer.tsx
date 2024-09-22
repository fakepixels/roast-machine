import { Github, Code } from 'lucide-react'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="py-4 px-6 fixed bottom-0 left-0 right-0">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-600 flex items-center">
            <span>Made with</span>
            <Link 
              href="https://onchainkit.xyz" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-black hover:text-blue-500 transition-colors duration-200 mx-1"
            >
              OnchainKit
            </Link>
            <span>&</span>
            <Link 
              href="https://cdp.coinbase.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-black hover:text-blue-500 transition-colors duration-200 mx-1"
            >
              CDP
            </Link>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Link 
            href="https://github.com/fakepixels/roast-machine" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-black hover:text-blue-500 transition-colors duration-200"
          >
            <Github className="w-5 h-5" />
          </Link>
          <Link 
            href="https://cdp.coinbase.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-black hover:text-blue-500 transition-colors duration-200"
          >
            <Code className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </footer>
  )
}

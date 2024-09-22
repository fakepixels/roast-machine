import { Github, Twitter } from 'lucide-react'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="py-4">
      <div className="container mx-auto flex justify-center items-center space-x-6">
        <Link 
          href="https://github.com/fakepixels/roast-machine" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-black hover:text-gray-600 transition-colors duration-200"
        >
          <Github className="w-6 h-6" />
        </Link>
        <Link 
          href="https://x.com/fkpxls" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-black hover:text-gray-600 transition-colors duration-200"
        >
          <Twitter className="w-6 h-6" />
        </Link>
      </div>
    </footer>
  )
}

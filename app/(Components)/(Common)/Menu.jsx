import React from 'react'
import Link from 'next/link'

function Menu() {
  return (
    <div className="absolute z-10 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
        <div className="py-1 text-sm text-gray-800">
            <Link href="/" className="block px-4 py-2 hover:bg-gray-100">Home</Link>
            <Link href="/about" className="block px-4 py-2 hover:bg-gray-100">About</Link>
            <Link href="/contact" className="block px-4 py-2 hover:bg-gray-100">Contact</Link>
            <Link href="/news" className="block px-4 py-2 hover:bg-gray-100">News</Link>
        </div>
    </div>
  )
}

export default Menu
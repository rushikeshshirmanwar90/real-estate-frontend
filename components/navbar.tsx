"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import logo from "@/public/logo-mini.png"
import Image from "next/image"


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src={logo}
              alt="Logo"
              width={40}
              height={40}
              className="h-20 w-20 rounded-md bg-gradient-to-r"
            />
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-800 hover:text-indigo-600 font-medium transition-colors">
              Home
            </Link>
            <Link href="#projects" className="text-gray-800 hover:text-indigo-600 font-medium transition-colors">
              Projects
            </Link>
            <Link href="#about" className="text-gray-800 hover:text-indigo-600 font-medium transition-colors">
              About
            </Link>
            <Link href="#services" className="text-gray-800 hover:text-indigo-600 font-medium transition-colors">
              Services
            </Link>
            <Link href="#contact" className="text-gray-800 hover:text-indigo-600 font-medium transition-colors">
              Contact
            </Link>
          </nav>

          <div className="hidden md:block">
            <Link
              href="#contact"
              className="px-5 py-2.5 rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium hover:shadow-lg transition-all"
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 flex flex-col space-y-4">
            <Link
              href="/"
              className="text-gray-800 hover:text-indigo-600 font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="#projects"
              className="text-gray-800 hover:text-indigo-600 font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Projects
            </Link>
            <Link
              href="#about"
              className="text-gray-800 hover:text-indigo-600 font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="#services"
              className="text-gray-800 hover:text-indigo-600 font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              href="#contact"
              className="text-gray-800 hover:text-indigo-600 font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              href="#contact"
              className="px-5 py-2.5 rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium hover:shadow-lg transition-all inline-block w-fit"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact Us
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}

export default Navbar

import Link from "next/link"
import { Search } from "lucide-react"

export function ProjectsHeader() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-10 w-10 rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center">
                <span className="text-white font-bold text-xl">RE</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                RealEstate
              </span>
            </Link>
            <nav className="hidden md:flex ml-10 space-x-8">
              <Link href="/" className="text-gray-800 hover:text-indigo-600 font-medium transition-colors">
                Home
              </Link>
              <Link href="#projects" className="text-indigo-600 font-medium">
                Projects
              </Link>
              <Link href="#about" className="text-gray-800 hover:text-indigo-600 font-medium transition-colors">
                About
              </Link>
              <Link href="#contact" className="text-gray-800 hover:text-indigo-600 font-medium transition-colors">
                Contact
              </Link>
            </nav>
          </div>
          <div className="flex items-center w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search projects..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
            <Link
              href="#contact"
              className="hidden md:inline-flex ml-4 px-5 py-2 rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium hover:shadow-lg transition-all"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}


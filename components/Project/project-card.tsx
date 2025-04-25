"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react"

type SectionType = {
  sectionId: string
  name: string
  type: string
}

type ProjectType = {
  _id: string
  name: string
  images: string[]
  state: string
  city: string
  area: string
  projectType: string
  section: SectionType[]
}

interface ProjectCardProps {
  project: ProjectType
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === project.images.length - 1 ? 0 : prev + 1))
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? project.images.length - 1 : prev - 1))
  }

  const getStatusBadge = () => {
    switch (project.projectType) {
      case "ongoing":
        return (
          <div className="absolute top-4 right-4 z-10 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            Ongoing
          </div>
        )
      case "completed":
        return (
          <div className="absolute top-4 right-4 z-10 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            Completed
          </div>
        )
      case "upcoming":
        return (
          <div className="absolute top-4 right-4 z-10 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            Upcoming
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group">
      <div className="relative h-64">
        {getStatusBadge()}
        <Image
          src={project.images[currentImageIndex] || "/placeholder.svg"}
          alt={`${project.name} - Image ${currentImageIndex + 1}`}
          fill
          className="object-cover"
        />

        {/* Image Navigation */}
        <button
          onClick={(e) => {
            e.preventDefault()
            prevImage()
          }}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/30 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Previous image"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault()
            nextImage()
          }}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/30 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Next image"
        >
          <ChevronRight size={20} />
        </button>

        {/* Image Indicators */}
        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
          {project.images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${index === currentImageIndex ? "bg-white w-4" : "bg-white/60"
                }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{project.name}</h3>
        <div className="flex items-center text-gray-600 mb-4">
          <MapPin size={16} className="mr-1 text-indigo-600" />
          <span className="text-sm">
            {project.area}, {project.city}, {project.state}
          </span>
        </div>

        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Sections:</h4>
          <div className="flex flex-wrap gap-2">
            {project.section.map((section) => (
              <span
                key={section.sectionId}
                className={`text-xs px-2 py-1 rounded-md ${section.type === "building"
                  ? "bg-indigo-100 text-indigo-700"
                  : section.type === "row house"
                    ? "bg-purple-100 text-purple-700"
                    : "bg-gray-100 text-gray-700"
                  }`}
              >
                {section.name}
              </span>
            ))}
          </div>
        </div>

        <Link
          href={`/projects/${project._id}`}
          className="block w-full py-2.5 text-center rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium hover:shadow-md transition-all"
        >
          View Details
        </Link>
      </div>
    </div>
  )
}


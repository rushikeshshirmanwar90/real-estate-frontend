"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay } from "swiper/modules"
import { Ruler, Home } from "lucide-react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import Image from "next/image"

interface BuildingSection {
  name: string
  description: string
  images: string[]
}

interface FlatInfo {
  title: string
  description: string
  images: string[]
  totalFlats: number
  totalBookedFlats: number
  totalArea: number
  video?: string
}

interface Amenity {
  icon: string
  name: string
}

interface Building {
  _id: string
  name: string
  description: string
  area: number
  projectId: string
  images: string[]
  section: BuildingSection[]
  flatInfo: FlatInfo[]
  amenities: Amenity[]
}

export function BuildingDetails({ building }: { building: Building }) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-lg">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-teal-900">{building?.name}</h1>
      </div>

      <div className="mb-8 overflow-hidden rounded-xl">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          className="h-[400px] w-full"
        >
          {building?.images?.map((image, index) => (
            <SwiperSlide key={index}>
              <Image
                src={image || "/placeholder.svg"}
                alt={`${building?.name} - Image ${index + 1}`}
                className="h-full w-full object-cover"
                width={500}
                height={200}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="mb-8">
        <h2 className="mb-4 text-xl font-semibold text-teal-800">About This Building</h2>
        <p className="text-gray-700 leading-relaxed">{building?.description}</p>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-lg bg-teal-50 p-4">
          <h3 className="mb-3 flex items-center text-lg font-semibold text-teal-800">
            <Ruler className="mr-2 h-5 w-5" />
            Building Details
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Area:</span>
              <span className="font-medium">{building?.area} sq.ft.</span>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-teal-50 p-4">
          <h3 className="mb-3 flex items-center text-lg font-semibold text-teal-800">
            <Home className="mr-2 h-5 w-5" />
            Flat Information
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Flat Types: </span>
              <span className="font-medium">{building?.flatInfo?.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Flats:</span>
              <span className="font-medium">{building?.flatInfo?.reduce((acc, flat) => acc + flat?.totalFlats, 0)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Available Flats: </span>
              <span className="font-medium">
                {building?.flatInfo?.reduce((acc, flat) => acc + (flat?.totalFlats - flat?.totalBookedFlats), 0)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


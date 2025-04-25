"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay } from "swiper/modules"
import { Ruler } from "lucide-react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import Image from "next/image"

interface OtherSection {
  _id: string
  name: string
  images: string[]
  area: number
  projectId: string
  description: string
}

export function OtherSectionDetails({ otherSection }: { otherSection: OtherSection }) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-lg">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-emerald-900">{otherSection.name}</h1>
      </div>

      <div className="mb-8 overflow-hidden rounded-xl">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          className="h-[400px] w-full"
        >
          {otherSection?.images?.map((image, index) => (
            <SwiperSlide key={index}>
              <Image
                src={image || "/placeholder.svg"}
                alt={`${otherSection.name} - Image ${index + 1}`}
                className="h-full w-full object-cover"
                width={500}
                height={200}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="mb-8">
        <h2 className="mb-4 text-xl font-semibold text-emerald-800">About This Section</h2>
        <p className="text-gray-700 leading-relaxed">{otherSection.description}</p>
      </div>

      <div className="mb-8">
        <div className="rounded-lg bg-emerald-50 p-4 inline-block">
          <h3 className="mb-3 flex items-center text-lg font-semibold text-emerald-800">
            <Ruler className="mr-2 h-5 w-5" />
            Area Details
          </h3>
          <p className="text-3xl font-bold text-emerald-700">{otherSection.area} sq.ft.</p>
        </div>
      </div>
    </div>
  )
}


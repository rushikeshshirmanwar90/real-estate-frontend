"use client"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination } from "swiper/modules"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Home, Ruler, Video } from "lucide-react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import Image from "next/image"

interface FlatInfo {
  title: string
  description: string
  images: string[]
  totalFlats: number
  totalBookedFlats: number
  totalArea: number
  video?: string
}

export function FlatInfo({ flatInfo }: { flatInfo: FlatInfo[] | undefined }) {
  if (!flatInfo) {
    return null;
  }

  return (
    <Tabs defaultValue={flatInfo[0]?.title}>
      <TabsList className="mb-6 grid w-full grid-cols-1 md:grid-cols-3">
        {flatInfo?.map((flat) => (
          <TabsTrigger key={flat.title} value={flat.title}>
            {flat.title}
          </TabsTrigger>
        ))}
      </TabsList>

      {flatInfo?.map((flat) => (
        <TabsContent key={flat.title} value={flat.title} className="mt-0">
          <div className="rounded-xl bg-white p-6 shadow-md">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div>
                <h3 className="mb-4 text-xl font-bold text-teal-800">{flat.title}</h3>
                <p className="mb-6 text-gray-700">{flat.description}</p>

                <div className="mb-6 space-y-4">
                  <div>
                    <div className="mb-1 flex justify-between">
                      <span className="text-sm font-medium text-gray-700">Availability</span>
                      <span className="text-sm text-gray-600">
                        {flat.totalFlats - flat.totalBookedFlats} of {flat.totalFlats} available
                      </span>
                    </div>
                    <Progress value={(flat.totalBookedFlats / flat.totalFlats) * 100} className="h-2 bg-gray-200" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg bg-teal-50 p-4">
                    <div className="flex items-center">
                      <Home className="mr-2 h-5 w-5 text-teal-600" />
                      <span className="text-sm font-medium text-gray-700">Total Flats</span>
                    </div>
                    <p className="mt-2 text-2xl font-bold text-teal-700">{flat.totalFlats}</p>
                  </div>

                  <div className="rounded-lg bg-teal-50 p-4">
                    <div className="flex items-center">
                      <Ruler className="mr-2 h-5 w-5 text-teal-600" />
                      <span className="text-sm font-medium text-gray-700">Area</span>
                    </div>
                    <p className="mt-2 text-2xl font-bold text-teal-700">{flat.totalArea} sq.ft.</p>
                  </div>
                </div>

                {flat.video && (
                  <div className="mt-6">
                    <div className="flex items-center">
                      <Video className="mr-2 h-5 w-5 text-teal-600" />
                      <span className="text-sm font-medium text-gray-700">Virtual Tour</span>
                    </div>
                    <a
                      href={flat.video}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block rounded-md bg-teal-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-700"
                    >
                      Watch Video
                    </a>
                  </div>
                )}
              </div>

              <div className="overflow-hidden rounded-xl">
                <Swiper
                  modules={[Navigation, Pagination]}
                  navigation
                  pagination={{ clickable: true }}
                  className="h-full w-full"
                >
                  {flat.images.map((image, index) => (
                    <SwiperSlide key={index}>
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${flat.title} - Image ${index + 1}`}
                        className="h-full w-full object-cover"
                        width={500}
                        height={300}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  )
}


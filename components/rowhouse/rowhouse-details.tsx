"use client"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { useRef } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay } from "swiper/modules"
import { Ruler, Home, Percent } from "lucide-react"
import { Progress } from "@/components/ui/progress"

// Import Swiper styles
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import Image from "next/image"

interface Amenity {
  icon: string
  name: string
}

interface RowHouse {
  _id: string
  name: string
  description: string
  images: string[]
  totalHouse: number
  bookedHouse: number
  area: number
  projectId: string
  amenities: Amenity[]
}

export function RowHouseDetails({ rowHouse }: { rowHouse: RowHouse }) {
  const availableHouses = rowHouse.totalHouse - rowHouse.bookedHouse
  const percentBooked = (rowHouse.bookedHouse / rowHouse.totalHouse) * 100

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.12
      }
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.08,
        staggerDirection: -1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 24, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 120,
        damping: 24,
        duration: 0.5
      }
    },
    exit: {
      y: -24,
      opacity: 0,
      transition: {
        duration: 0.25
      }
    }
  }

  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <AnimatePresence mode="wait">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        exit="exit"
        variants={containerVariants}
        className="rounded-xl bg-white p-6 shadow-lg"
      >
        <motion.div variants={itemVariants} className="mb-6">
          <h1 className="text-3xl font-bold text-amber-900">{rowHouse.name}</h1>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-8 overflow-hidden rounded-xl">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            className="h-[400px] w-full"
          >
            {rowHouse?.images?.map((image, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  initial={{ scale: 1.1, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.3 + index * 0.12 }}
                  className="h-full w-full"
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${rowHouse.name} - Image ${index + 1}`}
                    className="h-full w-full object-cover"
                    width={500}
                    height={200}
                  />
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-8">
          <h2 className="mb-4 text-xl font-semibold text-amber-800">About These Row Houses</h2>
          <p className="text-gray-700 leading-relaxed">{rowHouse.description}</p>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-8">
          <div className="mb-2 flex justify-between">
            <span className="text-sm font-medium text-gray-700">Availability</span>
            <span className="text-sm text-gray-600">
              {availableHouses} of {rowHouse.totalHouse} available
            </span>
          </div>
          <Progress value={percentBooked} className="h-3 bg-gray-200" />
        </motion.div>

        <motion.div variants={containerVariants} className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          <motion.div variants={itemVariants} className="rounded-lg bg-amber-50 p-4">
            <h3 className="mb-3 flex items-center text-lg font-semibold text-amber-800">
              <Home className="mr-2 h-5 w-5" />
              Total Houses
            </h3>
            <p className="text-3xl font-bold text-amber-700">{rowHouse?.totalHouse}</p>
          </motion.div>

          <motion.div variants={itemVariants} className="rounded-lg bg-amber-50 p-4">
            <h3 className="mb-3 flex items-center text-lg font-semibold text-amber-800">
              <Percent className="mr-2 h-5 w-5" />
              Available
            </h3>
            <p className="text-3xl font-bold text-amber-700">{availableHouses}</p>
          </motion.div>

          <motion.div variants={itemVariants} className="rounded-lg bg-amber-50 p-4">
            <h3 className="mb-3 flex items-center text-lg font-semibold text-amber-800">
              <Ruler className="mr-2 h-5 w-5" />
              Area per House
            </h3>
            <p className="text-3xl font-bold text-amber-700">{rowHouse?.area} sq.ft.</p>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}


"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay } from "swiper/modules"
import { Ruler } from "lucide-react"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

interface OtherSection {
  _id: string
  name: string
  images: string[]
  area: number
  projectId: string
  description: string
}

export function OtherSectionDetails({ otherSection }: { otherSection: OtherSection }) {
  // Animation variants (similar to building-details.tsx)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.15
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

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={containerVariants}
        className="rounded-xl bg-white p-6 shadow-lg"
      >
        <motion.div variants={itemVariants} className="mb-6">
          <h1 className="text-3xl font-bold text-emerald-900">{otherSection.name}</h1>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-8 overflow-hidden rounded-xl">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            className="h-[400px] w-full"
          >
            {otherSection?.images?.map((image, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  initial={{ scale: 1.1, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.3 + index * 0.12 }}
                  className="h-full w-full"
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${otherSection.name} - Image ${index + 1}`}
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
          <h2 className="mb-4 text-xl font-semibold text-emerald-800">About This Section</h2>
          <p className="text-gray-700 leading-relaxed">{otherSection.description}</p>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-8">
          <div className="rounded-lg bg-emerald-50 p-4 inline-block">
            <h3 className="mb-3 flex items-center text-lg font-semibold text-emerald-800">
              <Ruler className="mr-2 h-5 w-5" />
              Area Details
            </h3>
            <p className="text-3xl font-bold text-emerald-700">{otherSection.area} sq.ft.</p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}


"use client"
import { useState, useRef } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination } from "swiper/modules"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Home, Ruler, Video } from "lucide-react"
import { motion, AnimatePresence, useInView } from "framer-motion"

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
  const [selectedTab, setSelectedTab] = useState(flatInfo?.[0]?.title || "")
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })

  if (!flatInfo) {
    return null
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05, // faster stagger
        delayChildren: 0.05    // less initial delay
      }
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.03,
        staggerDirection: -1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 16, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const, // Fixed: added 'as const'
        stiffness: 180, // faster spring
        damping: 18
      }
    },
    exit: {
      y: -16,
      opacity: 0,
      transition: {
        duration: 0.12 // faster exit
      }
    }
  }

  const progressVariants = {
    hidden: { width: 0 },
    visible: {
      width: "100%",
      transition: {
        duration: 0.4, // faster progress bar
        ease: "easeOut" as const, // Fixed: added 'as const'
        delay: 0.1
      }
    }
  }

  const cardVariants = {
    hidden: { scale: 0.92, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring" as const, // Fixed: added 'as const'
        stiffness: 250, // snappier
        damping: 18
      }
    }
  }

  const imageContainerVariants = {
    hidden: { x: 32, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring" as const, // Fixed: added 'as const'
        stiffness: 120,
        damping: 12,
        delay: 0.1
      }
    }
  }

  return (
    <Tabs defaultValue={flatInfo[0]?.title} value={selectedTab} onValueChange={setSelectedTab}>
      <TabsList className="mb-6 grid w-full grid-cols-1 md:grid-cols-3">
        {flatInfo?.map((flat) => (
          <TabsTrigger key={flat.title} value={flat.title}>
            {flat.title}
          </TabsTrigger>
        ))}
      </TabsList>

      <AnimatePresence mode="wait">
        {flatInfo?.map((flat) => (
          selectedTab === flat.title && (
            <TabsContent key={flat.title} value={flat.title} className="mt-0" forceMount>
              <motion.div
                ref={ref}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                exit="exit"
                variants={containerVariants}
                className="rounded-xl bg-white p-6 shadow-md"
              >
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                  <motion.div variants={containerVariants}>
                    <motion.h3
                      variants={itemVariants}
                      className="mb-4 text-xl font-bold text-teal-800"
                    >
                      {flat.title}
                    </motion.h3>

                    <motion.p
                      variants={itemVariants}
                      className="mb-6 text-gray-700"
                    >
                      {flat.description}
                    </motion.p>

                    <motion.div variants={itemVariants} className="mb-6 space-y-4">
                      <div>
                        <div className="mb-1 flex justify-between">
                          <span className="text-sm font-medium text-gray-700">Availability</span>
                          <motion.span
                            className="text-sm text-gray-600"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }} // less delay
                          >
                            {flat.totalFlats - flat.totalBookedFlats} of {flat.totalFlats} available
                          </motion.span>
                        </div>
                        <motion.div variants={progressVariants}>
                          <Progress
                            value={(flat.totalBookedFlats / flat.totalFlats) * 100}
                            className="h-2 bg-gray-200"
                          />
                        </motion.div>
                      </div>
                    </motion.div>

                    <motion.div
                      className="grid grid-cols-2 gap-4"
                      variants={containerVariants}
                    >
                      <motion.div
                        variants={cardVariants}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="rounded-lg bg-teal-50 p-4"
                      >
                        <div className="flex items-center">
                          <Home className="mr-2 h-5 w-5 text-teal-600" />
                          <span className="text-sm font-medium text-gray-700">Total Flats</span>
                        </div>
                        <motion.p
                          className="mt-2 text-2xl font-bold text-teal-700"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            type: "spring" as const, // Fixed: added 'as const'
                            stiffness: 350,
                            damping: 18,
                            delay: 0.2 // less delay
                          }}
                        >
                          {flat.totalFlats}
                        </motion.p>
                      </motion.div>

                      <motion.div
                        variants={cardVariants}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="rounded-lg bg-teal-50 p-4"
                      >
                        <div className="flex items-center">
                          <Ruler className="mr-2 h-5 w-5 text-teal-600" />
                          <span className="text-sm font-medium text-gray-700">Area</span>
                        </div>
                        <motion.p
                          className="mt-2 text-2xl font-bold text-teal-700"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            type: "spring" as const, // Fixed: added 'as const'
                            stiffness: 350,
                            damping: 18,
                            delay: 0.25 // less delay
                          }}
                        >
                          {flat.totalArea} sq.ft.
                        </motion.p>
                      </motion.div>
                    </motion.div>

                    {flat.video && (
                      <motion.div
                        variants={itemVariants}
                        className="mt-6"
                      >
                        <div className="flex items-center">
                          <Video className="mr-2 h-5 w-5 text-teal-600" />
                          <span className="text-sm font-medium text-gray-700">Virtual Tour</span>
                        </div>
                        <motion.a
                          href={flat.video}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 inline-block rounded-md bg-teal-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-700"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Watch Video
                        </motion.a>
                      </motion.div>
                    )}
                  </motion.div>

                  <motion.div
                    variants={imageContainerVariants}
                    className="overflow-hidden rounded-xl"
                  >
                    <Swiper
                      modules={[Navigation, Pagination]}
                      navigation
                      pagination={{ clickable: true }}
                      className="h-full w-full"
                    >
                      {flat.images.map((image, index) => (
                        <SwiperSlide key={index}>
                          <motion.div
                            initial={{ scale: 1.2, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }} // faster image fade-in
                          >
                            <Image
                              src={image || "/placeholder.svg"}
                              alt={`${flat.title} - Image ${index + 1}`}
                              className="h-full w-full object-cover"
                              width={500}
                              height={300}
                            />
                          </motion.div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </motion.div>
                </div>
              </motion.div>
            </TabsContent>
          )
        ))}
      </AnimatePresence>
    </Tabs>
  )
}
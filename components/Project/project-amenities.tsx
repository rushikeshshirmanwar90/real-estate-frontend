import type React from "react"
import { Wifi, Car, Dumbbell, Droplet, Shield, TreePine } from "lucide-react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { useRef } from "react"

interface Amenity {
  icon: string
  name: string
}

export function ProjectAmenities({ amenities }: { amenities?: Amenity[] }) {
  // Animation variants
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

  const getIcon = (iconName: string): React.ReactNode => {
    const iconProps: React.SVGProps<SVGSVGElement> = { className: "h-6 w-6" }

    switch (iconName.toLowerCase()) {
      case "wifi":
        return <Wifi {...iconProps} />
      case "car":
        return <Car {...iconProps} />
      case "dumbbell":
        return <Dumbbell {...iconProps} />
      case "swimming-pool":
        return <Droplet {...iconProps} />
      case "shield":
        return <Shield {...iconProps} />
      case "tree":
        return <TreePine {...iconProps} />
      default:
        return <Shield {...iconProps} />
    }
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        exit="exit"
        variants={containerVariants}
        className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
      >
        {amenities?.map((amenity, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="flex flex-col items-center rounded-lg bg-white p-4 text-center shadow-sm transition-all duration-300 hover:shadow-md"
          >
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-purple-600">
              {getIcon(amenity.icon)}
            </div>
            <span className="text-sm font-medium text-gray-800">{amenity.name}</span>
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  )
}


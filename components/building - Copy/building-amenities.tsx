import type React from "react"
import { CableCarIcon as Elevator, Power, Droplet, Flame } from "lucide-react"
import type { LucideProps } from "lucide-react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { useRef } from "react"

interface Amenity {
  icon: string
  name: string
}

export function BuildingAmenities({ amenities }: { amenities: Amenity[] }) {
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

  const getIcon = (iconName: string): React.ReactNode => {
    const iconProps: LucideProps = { className: "h-6 w-6" }

    switch (iconName.toLowerCase()) {
      case "elevator":
        return <Elevator {...iconProps} />
      case "power-backup":
        return <Power {...iconProps} />
      case "water-purifier":
        return <Droplet {...iconProps} />
      case "fire-safety":
        return <Flame {...iconProps} />
      default:
        return <Elevator {...iconProps} />
    }
  }

  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-100px" }) // triggers when section is visible

  return (
    <AnimatePresence mode="wait">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        exit="exit"
        variants={containerVariants}
        className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4"
      >
        {amenities?.map((amenity, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="flex flex-col items-center rounded-lg bg-white p-4 text-center shadow-sm transition-all duration-300 hover:shadow-md"
          >
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 text-teal-600">
              {getIcon(amenity.icon)}
            </div>
            <span className="text-sm font-medium text-gray-800">{amenity.name}</span>
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  )
}


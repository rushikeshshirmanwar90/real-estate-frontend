import { Building, Home, Landmark, ChevronRight } from "lucide-react"
import TransitionLink from "@/utils/TransitionLink"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { useRef } from "react"

interface Section {
  type: "Buildings" | "row house" | "other"
  sectionId: string
  name: string
}

export function SectionsList({ sections, projectId, projectName }: { sections?: Section[]; projectId?: string, projectName?: string }) {
  const getIcon = (type: string) => {
    switch (type) {
      case "Buildings":
        return <Building className="h-6 w-6 text-blue-600" />
      case "row house":
        return <Home className="h-6 w-6 text-amber-600" />
      case "other":
        return <Landmark className="h-6 w-6 text-emerald-600" />
      default:
        return <Landmark className="h-6 w-6 text-gray-600" />
    }
  }

  const getGradient = (type: string) => {
    switch (type) {
      case "Buildings":
        return "from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100"
      case "row house":
        return "from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100"
      case "other":
        return "from-emerald-50 to-green-50 hover:from-emerald-100 hover:to-green-100"
      default:
        return "from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200"
    }
  }

  const getUrl = (type: string, sectionId: string) => {
    switch (type) {
      case "Buildings":
        return `/projects/${projectId}/building/${sectionId}?projectName=${projectName}`
      case "row house":
        return `/projects/${projectId}/rowhouse/${sectionId}?projectName=${projectName}`
      case "other":
        return `/projects/${projectId}/other/${sectionId}?projectName=${projectName}`
      default:
        return "#"
    }
  }

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
        className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
      >
        {sections?.map((section) => (
          <motion.div
            key={section.sectionId}
            variants={itemVariants}
          >
            <TransitionLink className="h-full w-full" href={getUrl(section.type, section.sectionId)}>
              <div
                className={`flex items-center justify-between rounded-xl bg-gradient-to-r ${getGradient(section.type)} p-4 shadow-sm transition-all duration-300 hover:shadow-md`}
              >
                <div className="flex items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
                    {getIcon(section.type)}
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium text-gray-900">{section.name}</h3>
                    <p className="text-sm text-gray-600 capitalize">{section.type.replace("-", " ")}</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </TransitionLink>
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  )
}


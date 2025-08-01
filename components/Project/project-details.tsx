"use client";

import { MapPin, Calendar, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef } from "react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";

interface Section {
  sectionId: string;
  name: string;
  type: "Buildings" | "row house" | "other";
}

interface Amenity {
  icon: string;
  name: string;
}

interface Project {
  _id: string;
  name: string;
  images: string[];
  state: string;
  city: string;
  area: string;
  address: string;
  description: string;
  projectType: string;
  longitude: number;
  latitude: number;
  section: Section[];
  amenities: Amenity[];
}

export function ProjectDetails({ project }: { project: Project | undefined }) {
  const projectTypeColors = {
    ongoing: "bg-blue-100 text-blue-800",
    upcoming: "bg-amber-100 text-amber-800",
    completed: "bg-green-100 text-green-800",
  };

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  // If project is undefined or null, return a loading state or fallback UI
  if (!project) {
    return (
      <div className="rounded-xl bg-white p-6 shadow-lg">
        <p className="text-gray-600">Loading project details...</p>
      </div>
    );
  }

  const typeColor =
    projectTypeColors[project.projectType as keyof typeof projectTypeColors] || "bg-gray-100 text-gray-800";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.12,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.08,
        staggerDirection: -1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 24, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 120,
        damping: 24,
        duration: 0.5,
      },
    },
    exit: {
      y: -24,
      opacity: 0,
      transition: {
        duration: 0.25,
      },
    },
  };

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
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h1 className="text-3xl font-bold text-purple-900">{project.name}</h1>
            <Badge className={typeColor}>
              {project.projectType.charAt(0).toUpperCase() + project.projectType.slice(1)}
            </Badge>
          </div>
          <div className="mt-2 flex items-center text-gray-600">
            <MapPin className="mr-1 h-5 w-5 text-purple-600" />
            <span>{project.address}</span>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-8 overflow-hidden rounded-xl">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            className="h-[400px] w-full"
          >
            {project.images.map((image, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  initial={{ scale: 1.1, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.3 + index * 0.12 }}
                  className="h-full w-full"
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${project.name} - Image ${index + 1}`}
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
          <h2 className="mb-4 text-xl font-semibold text-purple-800">About This Project</h2>
          <p className="text-gray-700 leading-relaxed">{project.description}</p>
        </motion.div>

        <motion.div variants={containerVariants} className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <motion.div variants={itemVariants} className="rounded-lg bg-purple-50 p-4">
            <h3 className="mb-3 flex items-center text-lg font-semibold text-purple-800">
              <Info className="mr-2 h-5 w-5" />
              Location Details
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">State:</span>
                <span className="font-medium">{project.state}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">City:</span>
                <span className="font-medium">{project.city}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Area:</span>
                <span className="font-medium">{project.area}</span>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="rounded-lg bg-purple-50 p-4">
            <h3 className="mb-3 flex items-center text-lg font-semibold text-purple-800">
              <Calendar className="mr-2 h-5 w-5" />
              Project Status
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Type:</span>
                <span className="font-medium capitalize">{project.projectType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Sections:</span>
                <span className="font-medium">{project.section.length}</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
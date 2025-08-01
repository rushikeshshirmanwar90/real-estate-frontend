"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

import img1 from "@/assets/banner images/img-1.jpg"
import img2 from "@/assets/banner images/img-2.jpeg"
import img3 from "@/assets/banner images/img-3.jpg"


export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      image: img1,
      title: "Discover Your Dream Home",
      subtitle: "Luxury Properties in Prime Locations",
      buttonText: "Explore Now",
      buttonLink: "#projects"
    },
    {
      image: img2,
      title: "Invest in Your Future",
      subtitle: "High-Value Real Estate Opportunities",
      buttonText: "Get Started",
      buttonLink: "#contact"

    },
    {
      image: img3,
      title: "Experience Modern Living",
      subtitle: "Contemporary Designs with Premium Amenities",
      buttonText: "See More",
      buttonLink: "#projects"
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    }, 5000)
    return () => clearInterval(interval)
  }, [])


  return (
    <motion.section
      className="relative h-screen w-full overflow-hidden pt-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.8,
            ease: [0.43, 0.13, 0.23, 0.96] // Using bezier curve values instead of string
          }
        }
      }}
    >
      {/* Background Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? "opacity-100" : "opacity-0"}`}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            layout="fill"
            objectFit="cover"
            quality={85}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#2C3E50]/70 to-[#FFB200]/30" />
        </div>
      ))}

      {/* Content */}
      <motion.div
        className="container mx-auto px-4 h-full flex items-center relative z-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-3xl text-white">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            {slides[currentSlide].title}
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl mb-8 text-[#E5E7EB]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.7 }}
          >
            {slides[currentSlide].subtitle}
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
          >
            <Link
              href={slides[currentSlide].buttonLink}
              className="px-8 py-3 rounded-md bg-primary text-white font-medium hover:shadow-lg transition-all text-center"
            >
              {slides[currentSlide].buttonText}
            </Link>
            <Link
              href="#contact"
              className="px-8 py-3 rounded-md bg-[#004A53]/80 backdrop-blur-sm border border-[#E5E7EB]/30 text-[#E5E7EB] font-medium hover:bg-[#004A53] transition-all flex items-center justify-center gap-2"
            >
              Contact Us <ChevronRight size={16} />
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? "bg-primary w-8" : "bg-[#E5E7EB]/50"}`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </motion.section>
  )
}
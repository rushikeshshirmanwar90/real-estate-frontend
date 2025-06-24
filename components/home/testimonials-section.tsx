"use client"

import { useState, useEffect, useMemo } from "react"
import Image from "next/image"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"

import img1 from "@/assets/reviews/user-1.jpeg"
import img2 from "@/assets/reviews/user-2.jpeg"
import img3 from "@/assets/reviews/user-3.jpeg"
import img4 from "@/assets/reviews/user-4.jpeg"


export function TestimonialsSection() {
  const testimonials = useMemo(() => [
    {
      id: 1,
      name: "Amit Joshi",
      position: "Homeowner, Sunrise Heights",
      image: img1,
      rating: 5,
      text: "Buying our dream home at Sunrise Heights was the best decision we made. The quality of construction, attention to detail, and after-sales service have been exceptional. We couldn't be happier with our investment.",
    },
    {
      id: 2,
      name: "Sneha Reddy",
      position: "Investor, Green Valley",
      image: img2,
      rating: 5,
      text: "As an investor, I've worked with many developers, but RealEstate stands out for their transparency, timely delivery, and value appreciation. My properties in Green Valley have given excellent returns.",
    },
    {
      id: 3,
      name: "Rahul Mehta",
      position: "Business Owner, Metro Heights",
      image: img3,
      rating: 4,
      text: "The commercial space I purchased at Metro Heights has been perfect for my business. The strategic location, modern amenities, and professional management have helped my business thrive.",
    },
    {
      id: 4,
      name: "Meera Kapoor",
      position: "Resident, Riverside Residency",
      image: img4,
      rating: 5,
      text: "Living at Riverside Residency has been a wonderful experience. The community, facilities, and serene environment make it feel like a resort. The maintenance team is prompt and efficient.",
    },
  ], [])

  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleTestimonials, setVisibleTestimonials] = useState([testimonials[0]])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        // Show 3 testimonials on large screens
        setVisibleTestimonials([
          testimonials[currentIndex % testimonials.length],
          testimonials[(currentIndex + 1) % testimonials.length],
          testimonials[(currentIndex + 2) % testimonials.length],
        ])
      } else if (window.innerWidth >= 768) {
        // Show 2 testimonials on medium screens
        setVisibleTestimonials([
          testimonials[currentIndex % testimonials.length],
          testimonials[(currentIndex + 1) % testimonials.length],
        ])
      } else {
        // Show 1 testimonial on small screens
        setVisibleTestimonials([testimonials[currentIndex % testimonials.length]])
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [currentIndex, testimonials])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-20 bg-gradient-to-b from-white to-indigo-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
            What Our Clients Say
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear from our satisfied clients about their experience with our properties and services.
          </p>
        </div>

        <div className="relative">
          <div className="flex flex-wrap justify-center gap-8">
            {visibleTestimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white rounded-xl shadow-md p-6 max-w-md flex-1 min-w-[300px] transform transition-all duration-300 hover:shadow-xl"
              >
                <div className="flex items-center mb-4">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden mr-4">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">{testimonial.name}</h3>
                    <p className="text-sm text-primary">{testimonial.position}</p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < testimonial.rating ? "text-amber-400 fill-amber-400" : "text-gray-300"}
                    />
                  ))}
                </div>
                <p className="text-gray-600">{testimonial.text}</p>
              </div>
            ))}
          </div>

          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md text-primary flex items-center justify-center z-10 hover:bg-primary/5 transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md text-primary flex items-center justify-center z-10 hover:bg-primary/5 transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${index === currentIndex ? "bg-primary w-6" : "bg-gray-300"
                }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}


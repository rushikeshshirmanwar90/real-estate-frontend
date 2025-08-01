"use client"

import { useEffect, useState, useRef } from "react"
import { Building2, Home, Landmark, Users, Briefcase, BarChart3 } from "lucide-react"

export function ServicesSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const services = [
    {
      icon: <Building2 size={40} className="text-primary" />,
      title: "Residential Properties",
      description: "Find your dream home from our selection of apartments, villas, and houses across prime locations.",
    },
    {
      icon: <Landmark size={40} className="text-primary" />,
      title: "Commercial Spaces",
      description: "Premium office spaces, retail outlets, and commercial buildings for your business needs.",
    },
    {
      icon: <Home size={40} className="text-primary" />,
      title: "Property Management",
      description: "Comprehensive management services for property owners, including maintenance and tenant relations.",
    },
    {
      icon: <Users size={40} className="text-primary" />,
      title: "Consultancy Services",
      description: "Expert advice on property investment, legal matters, and market trends from our specialists.",
    },
    {
      icon: <Briefcase size={40} className="text-primary" />,
      title: "Investment Opportunities",
      description: "Curated investment options in high-growth areas with potential for significant returns.",
    },
    {
      icon: <BarChart3 size={40} className="text-primary" />,
      title: "Market Analysis",
      description: "Detailed reports and insights on real estate market trends to inform your investment decisions.",
    },
  ]

  return (
    <section ref={sectionRef} id="services" className="py-20 bg-gradient-to-b from-indigo-50 to-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Our Services</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6 transform transition-all duration-700 delay-300 scale-x-0 animate-[scaleX_0.7s_0.3s_ease-out_forwards]"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Comprehensive real estate solutions tailored to meet your needs, from finding your dream home to maximizing
            your investment returns.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`bg-white p-8 rounded-xl shadow-md border border-gray-100 group transform transition-all duration-700 hover:shadow-2xl hover:-translate-y-3 hover:border-primary/20 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{
                transitionDelay: `${index * 150 + 500}ms`,
                animationDelay: `${index * 150 + 500}ms`,
              }}
            >
              <div className="mb-6 transform group-hover:scale-125 transition-all duration-500 group-hover:rotate-12 relative">
                <div className="absolute inset-0 bg-primary/10 rounded-full scale-0 group-hover:scale-150 transition-transform duration-500 opacity-0 group-hover:opacity-100"></div>
                <div className="relative z-10 animate-float">{service.icon}</div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-primary transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                {service.description}
              </p>
              <div className="mt-4 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-500"></div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scaleX {
          to {
            transform: scaleX(1);
          }
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}

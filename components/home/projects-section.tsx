"use client"

import { useEffect, useState, useRef } from "react"
import { ProjectCard } from "@/components/Project/project-card"
import type { Project } from "@/types/Project"
import axios from "axios"
import { domain } from "@/domain"

export function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([])
  const [filter, setFilter] = useState("all")
  const [isVisible, setIsVisible] = useState(false)
  const [animateCards, setAnimateCards] = useState(false)
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

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await axios.get(`${domain}/api/project`, {
          params: {
            clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
          },
        })
        setProjects(data)
      } catch (error) {
        console.error("Error fetching projects:", error)
      }
    }

    fetchProjects()
  }, [])

  useEffect(() => {
    setAnimateCards(false)
    const timer = setTimeout(() => setAnimateCards(true), 100)
    return () => clearTimeout(timer)
  }, [filter])

  const filteredProjects = filter === "all" ? projects : projects.filter((project) => project.projectType === filter)

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter)
  }

  return (
    <section ref={sectionRef} id="projects" className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Our Real Estate Projects</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6 transform transition-all duration-700 delay-300 scale-x-0 animate-[scaleX_0.7s_0.3s_ease-out_forwards]"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our portfolio of premium properties across India, designed for modern living and investment
            opportunities.
          </p>
        </div>

        <div
          className={`flex justify-center mb-10 transition-all duration-800 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <div className="inline-flex bg-gray-100 rounded-lg p-1 shadow-lg">
            {["all", "ongoing", "completed", "upcoming"].map((filterType, index) => (
              <button
                key={filterType}
                onClick={() => handleFilterChange(filterType)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                  filter === filterType
                    ? "bg-primary text-white shadow-lg scale-105"
                    : "text-gray-700 hover:bg-gray-200 hover:shadow-md"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {filterType === "all" ? "All Projects" : filterType.charAt(0).toUpperCase() + filterType.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <div
                key={project._id}
                className={`transform transition-all duration-700 hover:scale-105 ${
                  animateCards && isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{
                  transitionDelay: `${index * 150 + 200}ms`,
                  animationDelay: `${index * 150 + 200}ms`,
                }}
              >
                <ProjectCard project={project} />
              </div>
            ))
          ) : (
            <div
              className={`col-span-full flex flex-col items-center justify-center py-16 transition-all duration-1000 ${
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
            >
              <div className="animate-bounce mb-4">
                <span className="text-6xl">🚧</span>
              </div>
              <h3 className="text-2xl font-semibold text-[#2C3E50] mb-2 animate-fade-in">
                {filter === "all"
                  ? "No projects available at the moment."
                  : `${filter.charAt(0).toUpperCase() + filter.slice(1)} projects are coming soon!`}
              </h3>
              <p className="text-[#2C3E50]/70 animate-fade-in-delay">
                Stay tuned for exciting updates and new opportunities.
              </p>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes scaleX {
          to {
            transform: scaleX(1);
          }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fade-in-delay {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        .animate-fade-in-delay {
          animation: fade-in-delay 0.8s ease-out 0.3s forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  )
}

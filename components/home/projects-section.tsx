"use client"

import { useEffect, useState } from "react"
import { ProjectCard } from "@/components/Project/project-card"
import { Project } from "@/types/Project"
import axios from "axios"
import { domain } from "@/domain"

export function ProjectsSection() {

  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await axios.get(`${domain}/api/project`, {
          params: {
            clientId: process.env.NEXT_PUBLIC_CLIENT_ID
          }
        });
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);


  const [filter, setFilter] = useState("all")

  const filteredProjects = filter === "all" ? projects : projects.filter((project) => project.projectType === filter)

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
            Our Real Estate Projects
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our portfolio of premium properties across India, designed for modern living and investment
            opportunities.
          </p>
        </div>

        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${filter === "all"
                ? "bg-primary text-white shadow-md"
                : "text-gray-700 hover:bg-gray-200"
                }`}
            >
              All Projects
            </button>
            <button
              onClick={() => setFilter("ongoing")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${filter === "ongoing"
                ? "bg-primary text-white shadow-md"
                : "text-gray-700 hover:bg-gray-200"
                }`}
            >
              Ongoing
            </button>
            <button
              onClick={() => setFilter("completed")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${filter === "completed"
                ? "bg-primary text-white shadow-md"
                : "text-gray-700 hover:bg-gray-200"
                }`}
            >
              Completed
            </button>
            <button
              onClick={() => setFilter("upcoming")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${filter === "upcoming"
                ? "bg-primary text-white shadow-md"
                : "text-gray-700 hover:bg-gray-200"
                }`}
            >
              Upcoming
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-16">
              <span className="text-4xl mb-4">🚧</span>
              <h3 className="text-2xl font-semibold text-[#2C3E50] mb-2">
                {filter === "all"
                  ? "No projects available at the moment."
                  : `${filter.charAt(0).toUpperCase() + filter.slice(1)} projects are coming soon!`}
              </h3>
              <p className="text-[#2C3E50]/70">
                Stay tuned for exciting updates and new opportunities.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}


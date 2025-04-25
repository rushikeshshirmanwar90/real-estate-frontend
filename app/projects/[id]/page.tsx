"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"

import { ProjectDetails } from "@/components/Project/project-details"
import { SectionsList } from "@/components/Project/sections-list"
import { ProjectAmenities } from "@/components/Project/project-amenities"
import { Project } from "@/types/Project"
import axios from "axios"
import { InterestForm } from "@/components/intrested-form"

const ProjectPage = () => {

  const params = useParams()
  const projectId = Array.isArray(params.id) ? params.id.join('') : params.id || '';

  const [project, setProject] = useState<Project>();
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchProject = async () => {
      const res = await axios.get(`http://localhost:8080/api/project`, {
        params: { id: projectId },
      });

      const data = res.data;
      setProject(data);
      setLoading(false);
    }
    fetchProject();
  }, [projectId, loading]);



  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-50 to-pink-50">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg">
          <h1 className="text-2xl font-bold text-purple-800 mb-4">Project Not Found</h1>
          <p className="text-gray-600 mb-6">The project you&#39;re looking for doesn&#39;t exist or has been removed.</p>
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            Return to Home
          </Link>
        </div>
      </div>
    )
  }


  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        <Link
          href="/"
          className="inline-flex items-center mb-6 text-purple-700 hover:text-purple-900 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back to Projects
        </Link>

        <ProjectDetails project={project} />

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-purple-800">Project Sections</h2>
          <SectionsList sections={project?.section} projectId={project?._id} projectName={project?.name} />
        </div>

        <div className="mt-12 mb-16">
          <h2 className="text-2xl font-bold mb-6 text-purple-800">Amenities</h2>
          <ProjectAmenities amenities={project?.amenities} />
        </div>
      </div>

      <InterestForm buildingName="Home" buildingId="1" />


    </div>
  )
}

export default ProjectPage

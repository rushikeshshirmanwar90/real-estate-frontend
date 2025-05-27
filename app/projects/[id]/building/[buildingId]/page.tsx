"use client"

import { useEffect, useState } from "react"

import Link from "next/link"
import Image from "next/image"
import { useParams, useSearchParams } from "next/navigation"

import axios from "axios"

import { BuildingDetails } from "@/components/building/building-details"
import { FlatInfo } from "@/components/building/flat-info"
import { BuildingAmenities } from "@/components/building/building-amenities"
import { Building } from "@/types/Building"
import { InterestForm } from "@/components/intrested-form"
import { domain } from "@/domain"

const BuildingPage = () => {

  const params = useParams()
  const searchParams = useSearchParams();


  const id = params.buildingId;
  const projectName = decodeURIComponent(searchParams.get("projectName") || "");


  const [building, setBuilding] = useState<Building>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`${domain}/api/building`, {
        params: { id }
      })

      const data = res.data

      console.log(data);

      setBuilding(data);
      setLoading(false)
    }

    fetchData()
  }, [id, loading])



  if (!building) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-teal-50 to-cyan-50">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg">
          <h1 className="text-2xl font-bold text-teal-800 mb-4">Building Not Found</h1>
          <p className="text-gray-600 mb-6">The building you&#39;re looking for doesn&#39;t exist or has been removed.</p>
          <Link
            href={`/projects/${params.id}`}
            className="inline-flex items-center px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
          >
            Return to Project
          </Link>
        </div>
      </div>
    )
  }



  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-cyan-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col mb-6">
          <Link
            href={`/projects/${params.id}`}
            className="inline-flex items-center mb-2 text-teal-700 hover:text-teal-900 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back to {projectName}
          </Link>
        </div>

        <BuildingDetails building={building} />

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-teal-800">Building Sections</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {building?.section.map((section, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-[1.02]"
              >

                <Image
                  src={section?.images[0] || "/placeholder.svg"}
                  alt={section?.name || "Section Image"}
                  width={500}
                  height={192}
                  className="w-full h-48 object-cover"
                />


                <div className="p-6">
                  <h3 className="text-xl font-bold text-teal-800 mb-2">{section?.name}</h3>
                  <p className="text-gray-600">{section?.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-teal-800">Available Flats</h2>
          <FlatInfo flatInfo={building?.flatInfo} />
        </div>

        <div className="mt-12 mb-16">
          <h2 className="text-2xl font-bold mb-6 text-teal-800">Building Amenities</h2>
          <BuildingAmenities amenities={building?.amenities} />
        </div>
        <div className="">
          <InterestForm propertyName={building.name} propertyId={building._id} projectName={projectName} projectType={"building"} />
        </div>
      </div>
    </div>
  )
}

export default BuildingPage
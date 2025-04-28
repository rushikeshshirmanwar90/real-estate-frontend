"use client"

import { useParams, useSearchParams } from "next/navigation"
import Link from "next/link"
import { OtherSection } from "@/types/Other";
import { useEffect, useState } from "react";
import axios from "axios";
import { OtherSectionDetails } from "@/components/other-section-details";
import { domain } from "@/domain";

const OtherSectionPage = () => {

  const params = useParams();
  const searchParams = useSearchParams();

  const id = params.otherId;

  const projectName = decodeURIComponent(searchParams.get("projectName") || "");

  const [otherSection, setOtherSection] = useState<OtherSection | null>(null)

  const [loading, setLoading] = useState<boolean>(true);


  useEffect(() => {

    const fetchData = async () => {
      const res = await axios.get(`${domain}/api/otherSection`, {
        params: { id }
      })

      const data = res.data.data;

      console.log(data)

      setOtherSection(data);
      setLoading(false);
    }

    fetchData();

  }, [id, loading])


  if (!otherSection) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-emerald-50 to-lime-50">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg">
          <h1 className="text-2xl font-bold text-emerald-800 mb-4">Section Not Found</h1>
          <p className="text-gray-600 mb-6">The section you&apos;re looking for doesn&apos;t exist or has been removed.</p>
          <Link
            href={`/projects/${params.id}`}
            className="inline-flex items-center px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
          >
            Return to Project
          </Link>
        </div>
      </div>
    )
  }


  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-lime-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col mb-6">
          <Link
            href={`/projects/${params.id}`}
            className="inline-flex items-center mb-2 text-emerald-700 hover:text-emerald-900 transition-colors"
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

        <OtherSectionDetails otherSection={otherSection} />
      </div>
    </div>
  )
}

export default OtherSectionPage
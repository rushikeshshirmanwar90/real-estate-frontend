"use client"

import Link from "next/link"
import { useParams, useSearchParams } from "next/navigation"
import axios from "axios"

import { RowHouseDetails } from "@/components/rowhouse/rowhouse-details"
import { RowHouseAmenities } from "@/components/rowhouse/rowhouse-amenities"
import { RowHouse } from "@/types/RowHouse"
import { useCallback, useEffect, useState } from "react"
import { domain } from "@/domain"

const RowHousePage = () => {

  const params = useParams()
  const searchParams = useSearchParams();
  const id = params.rowhouseId;
  const projectName = decodeURIComponent(searchParams.get("projectName") || "");

  const [rowHouse, setRowHouse] = useState<RowHouse>();
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    const res = await axios.get(`${domain}/api/rowHouse`, {
      params: { id }
    });

    const data = res.data.data;

    console.log("working");
    console.log(data);

    setRowHouse(data);
    setLoading(false);
  }, [id]);


  useEffect(() => {
    fetchData();
  }, [fetchData, loading])



  if (!rowHouse) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-amber-50 to-orange-50">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg">
          <h1 className="text-2xl font-bold text-amber-800 mb-4">Row House Not Found</h1>
          <p className="text-gray-600 mb-6">The row house you&#39;re looking for doesn&#39;t exist or has been removed.</p>
          <Link
            href={`/projects/${params.id}`}
            className="inline-flex items-center px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
          >
            Return to Project
          </Link>
        </div>
      </div>
    )
  }


  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col mb-6">
          <Link
            href={`/projects/${params.id}`}
            className="inline-flex items-center mb-2 text-amber-700 hover:text-amber-900 transition-colors"
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

        <RowHouseDetails rowHouse={rowHouse} />

        <div className="mt-12 mb-16">
          <h2 className="text-2xl font-bold mb-6 text-amber-800">Row House Amenities</h2>
          <RowHouseAmenities amenities={rowHouse.amenities} />
        </div>
      </div>
    </div>
  )
}

export default RowHousePage
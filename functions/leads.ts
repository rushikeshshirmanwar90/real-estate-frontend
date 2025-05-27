import { domain } from "@/domain";
import axios from "axios";

interface userDetailsProps {
  name: string;
  phoneNumber: string;
}

interface propertyDetailsProps {
  name: string;
  id: string;
}

export const addLeads = async (
  userDetails: userDetailsProps,
  projectName: string,
  projectType: "rowhouse" | "building",
  propertyDetails: propertyDetailsProps
) => {
  try {
    const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;

    console.log(clientId);

    if (!clientId) {
      throw new Error("CLIENT_ID environment variable is not set");
    }

    const payload = {
      clientId,
      projectName,
      projectType,
      userDetails,
      propertyDetails,
    };

    console.log("Payload being sent:", payload);

    const response = await axios.post(`${domain}/api/leads`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const statusCode = error.response?.status;
      const errorMessage = error.response?.data?.message || error.message;
      console.error(`API Error (${statusCode}): ${errorMessage}`);
      throw new Error(`Failed to add lead: ${errorMessage}`);
    }
    console.error("Error adding lead:", error);
    throw error;
  }
};

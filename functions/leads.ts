import { domain } from "@/domain";
import axios from "axios";

interface userDetailsProps {
  name: string;
  phone: string;
}

interface propertyDetailsProps {
  propertyName: string;
  propertyId: string;
}

export const addLeads = async (
  userDetails: userDetailsProps,
  projectName: string,
  interestedType: "rowhouse" | "building",
  propertyDetails: propertyDetailsProps
) => {
  const { name, phone } = userDetails;

  const clientId = process.env.CLIENT_ID;

  const payload = {
    clientId,
    name,
    phone,
    projectName,
    interestedType,
    propertyDetails,
  };

  const res = await axios.post(`${domain}/api/leads`, payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.status !== 201) {
    console.error("Error adding lead:", res.data);
    throw new Error("Failed to add lead");
  } else {
    return res.data;
  }
};



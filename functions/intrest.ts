import { domain } from "@/domain";
import axios from "axios";

interface userDetailsProps {
  name: string;
  phoneNumber: string;
}

interface PropertyDetailsProps {
  name: string;
  id: string;
}

export const addInterestedProperty = async (
  userDetails: userDetailsProps,
  propertyDetails: PropertyDetailsProps
) => {
  try {
    const payload = {
      personalDetails: { ...userDetails },
      PropertyDetails: { ...propertyDetails },
    };

    console.log(payload);

    const response = await axios.post(`${domain}/api/interested`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response) {
      throw new Error("Failed to add interested property");
    }

    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error adding interested property:", error);
  }
};

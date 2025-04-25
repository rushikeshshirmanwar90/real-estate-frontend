import { domain } from "@/domain";
import axios from "axios";

export const getItem = async (endpoint: string, id: string) => {
  try {
    const res = await axios.get(`${domain}/api/${endpoint}`, {
      params: { id: id },
    });

    return res.data;
  } catch (error: unknown) {
    console.error(error);
    return null;
  }
};

export const getItems = async (endpoint: string) => {
  try {
    const res = await axios.get(`${domain}/api/${endpoint}`);

    return res.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

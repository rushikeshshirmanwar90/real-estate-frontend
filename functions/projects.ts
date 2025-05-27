import { domain } from "@/domain";
import { Project } from "@/types/Project";
import axios from "axios";

export const getProjects = async (
  setProjects: (projects: Project[]) => void
) => {
  const res = await axios.get(
    `${domain}/api/project?clientId=${process.env.NEXT_PUBLIC_CLIENT_ID}`
  );

  const data = res.data;

  console.log(data);

  setProjects(data);
};

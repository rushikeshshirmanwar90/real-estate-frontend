import { Project } from "@/types/Project";
import { getItems } from "@/lib/api";

export const getProjects = async (
  setProjects: (projects: Project[]) => void
) => {
  const data = await getItems("project");
  setProjects(data);
};

import { AddProjectForm, ProjectData } from "@/types";
import request from "@/utils/request";

export const getProjectList = () =>
  request<ProjectData[]>({ url: "/project", method: "GET" });

export const delProject = (appKey: string) =>
  request({ url: `/project/${appKey}`, method: "DELETE" });

export const addProject = (data: AddProjectForm) =>
  request({ url: "/project", method: "POST", data });

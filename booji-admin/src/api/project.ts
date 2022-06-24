import { AddProjectForm, Pagination, ProjectData } from "@/types";
import request from "@/utils/request";

export const getProjectList = (page: number, perPage: number) =>
  request<Pagination<ProjectData>>({
    url: "/project",
    method: "GET",
    params: { page, perPage },
  });

export const delProject = (appKey: string) =>
  request({ url: `/project/${appKey}`, method: "DELETE" });

export const addProject = (data: AddProjectForm) =>
  request({ url: "/project", method: "POST", data });

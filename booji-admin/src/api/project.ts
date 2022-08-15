import { AddProjectForm, Pagination, ProjectData } from "@/types";
import request from "@/utils/request";

export const getProjectList = (page: number, perPage: number) =>
  request<Pagination<ProjectData>>({
    url: "/project",
    method: "GET",
    params: { page, perPage },
  });

export const delProject = (id: number) =>
  request({ url: `/project/${id}`, method: "DELETE" });

export const addProject = (data: AddProjectForm) =>
  request({ url: "/project", method: "POST", data });

export const subscribeProject = (id: number) =>
  request({ url: `/project/${id}/subscribe`, method: "PATCH" });

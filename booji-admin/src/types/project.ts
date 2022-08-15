import { UserData } from ".";

export interface ProjectData {
  id: number;
  appKey: string;
  createdAt: string;
  desc: string;
  name: string;
  platform: Platform;
  users: UserData[];
  updatedAt: string;
}

export interface AddProjectForm {
  name: string;
  platform: Platform;
  remark?: string;
}

export enum Platform {
  JavaScript = "js",
  React = "react",
  Vue = "vue",
  Angular = "angular",
}

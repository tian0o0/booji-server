import { UserData } from ".";

export interface ProjectData {
  id: number;
  appKey: string;
  desc: string;
  name: string;
  platform: Platform;
  users: UserData[];
  ruleMinute: number;
  ruleCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface AddProjectForm {
  name: string;
  platform: Platform;
  remark?: string;
}

export interface UpdateProjectForm {
  ruleMinute?: number;
  ruleCount?: number;
}

export enum Platform {
  JavaScript = "js",
  React = "react",
  Vue = "vue",
  Angular = "angular",
}

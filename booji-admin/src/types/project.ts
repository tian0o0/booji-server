export interface ProjectData {
  appKey: string;
  createdAt: string;
  desc: string;
  name: string;
  platform: Platform;
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

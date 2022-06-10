export interface ProjectData {
  appKey: string;
  createdAt: string;
  desc: string;
  name: string;
  platform: string;
  updatedAt: string;
}

export interface AddProjectForm {
  name: string;
  platform: string;
  remark?: string;
}

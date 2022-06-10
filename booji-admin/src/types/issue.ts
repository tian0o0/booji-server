export interface IssueData {
  assigneeId: number;
  category: string;
  col: number;
  createdAt: string;
  eventCount: number;
  issueId: string;
  level: string;
  message: string;
  release: string;
  row: number;
  source: string;
  stack: string;
  status: number;
  type: string;
  updatedAt: string;
  users: string[];
}

export interface IssueParams {
  appKey: string;
  status: number;
  page: number;
  sort?: string;
  order?: "ASC" | "DESC";
}

import { SortOrder } from "antd/lib/table/interface";
import React from "react";

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
  status: string;
  page: number;
  sort?: React.Key | readonly React.Key[];
  order?: "ASC" | "DESC";
}

export enum Order {
  ascend = "ASC",
  descend = "DESC",
}

export interface UpdateIssueData {
  assigneeId?: number;
  status?: number;
}

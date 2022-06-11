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

export type IssueDetail = IssueData & { tags: Tag[] };

export interface Tag {
  count: number;
  id: number;
  key: string;
  value: string;
}

export interface Breadcrumb {
  category: string;
  data: string;
  level: string;
  timestamp: number;
  type: string;
}
export interface Event {
  appKey: string;
  breadcrumbs: Breadcrumb[];
  category: string;
  eventHash: string;
  eventId: string;
  issueId: string;
  level: string;
  locate: any;
  message: string;
  timestamp: number;
  type: string;
  ua: {
    browser: any;
    cpu: any;
    device: any;
    engine: any;
    os: any;
    ua: string;
  };
  url: string;
  user: { id: string };
}

import { IssueData, IssueParams, UpdateIssueData } from "@/types/issue";
import request from "@/utils/request";

export const getIssueList = (params: IssueParams) =>
  request<{ count: number; data: IssueData[] }>({
    url: "/issue",
    method: "GET",
    params,
  });

export const updateIssue = (issueId: string, data: UpdateIssueData) =>
  request({
    url: `/issue/${issueId}`,
    method: "PATCH",
    data,
  });

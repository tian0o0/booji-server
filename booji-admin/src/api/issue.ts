import {
  Event,
  IssueData,
  IssueDetail,
  IssueParams,
  UpdateIssueData,
} from "@/types/issue";
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

export const getIssueDetail = (issueId: string) =>
  request<IssueDetail>({
    url: `/issue/${issueId}`,
    method: "GET",
  });

export const getIssueEvents = (issueId: string) =>
  request<{ count: number; data: Event[] }>({
    url: `/issue/${issueId}/events`,
    method: "GET",
  });

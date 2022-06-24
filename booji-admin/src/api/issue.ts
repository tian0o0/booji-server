import { Pagination } from "@/types";
import {
  Event,
  IssueData,
  IssueDetail,
  IssueParams,
  UpdateIssueData,
} from "@/types/issue";
import request from "@/utils/request";

export const getIssueList = (params: IssueParams) =>
  request<Pagination<IssueData>>({
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

export const getIssueEvents = ({
  issueId,
  page,
}: {
  issueId: string;
  page: number;
}) =>
  request<Pagination<Event>>({
    url: `/issue/${issueId}/events`,
    method: "GET",
    params: { page },
  });

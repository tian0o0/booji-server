import { IssueData, IssueParams } from "@/types/issue";
import request from "@/utils/request";

export const getIssueList = (params: IssueParams) =>
  request<{ count: number; data: IssueData[] }>({
    url: "/issue",
    method: "GET",
    params,
  });

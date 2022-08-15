export * from "./UserAgent";
export * from "./Locate";
export * from "./Issue";

export interface Pagination<T> {
  count: number;
  data: T[];
}

export interface NotifyRule {
  minute: number;
  count: number;
}

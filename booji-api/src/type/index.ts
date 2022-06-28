export * from "./UserAgent";
export * from "./Locate";

export interface Pagination<T> {
  count: number;
  data: T[];
}

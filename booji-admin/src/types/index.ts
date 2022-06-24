export * from "./user";
export * from "./error";
export * from "./project";

export interface Pagination<T> {
  data: T[];
  count: number;
}

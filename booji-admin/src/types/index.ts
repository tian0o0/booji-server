export * from "./user";
export * from "./error";
export * from "./project";
export * from "./issue";

export interface Pagination<T> {
  data: T[];
  count: number;
}

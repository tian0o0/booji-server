export * from "./UserAgent";
export * from "./Locate";
export * from "./Issue";

export enum Platform {
  JavaScript = "js",
  Vue = "vue",
  Angular = "angular",
  React = "react",
  Mp = "mp",
}

export interface Pagination<T> {
  count: number;
  data: T[];
}

export interface NotifyRule {
  minute: number;
  count: number;
}

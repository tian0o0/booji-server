export interface UrlData {
  id: number;
  url: string;
}

export interface PerformanceData {
  id: number;
  dns: number;
  tcp: number;
  request: number;
  response: number;
  processing: number;
  load: number;
  createdAt: string;
}

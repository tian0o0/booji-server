export interface UrlData {
  id: number;
  url: string;
}

// export interface PerformanceData {
//   id: number;
//   dns: number;
//   tcp: number;
//   request: number;
//   response: number;
//   processing: number;
//   load: number;
//   createdAt: string;
// }

export interface Average {
  dns: number;
  tcp: number;
  request: number;
  response: number;
  processing: number;
  load: number;
}

export interface PerformanceData {
  axis: Date[];
  dns: number[];
  tcp: number[];
  request: number[];
  response: number[];
  processing: number[];
  load: number[];
  average: Average;
}

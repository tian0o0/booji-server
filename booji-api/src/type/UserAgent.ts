export interface UserAgent {
  ua: string;
  browser: { name: string; version: string; major: string };
  engine: { name: string; version: string };
  os: { name: string; version: string };
  device: { vendor: string; model: string; type: string };
  cpu: { architecture: string };
}

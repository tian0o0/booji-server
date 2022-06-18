import { Locate, UserAgent } from "@type/index";

const geoip = require("geoip-lite");
const uaparser = require("ua-parser-js");

export function parseLocate(ip: string): Locate | null {
  return geoip.lookup(ip);
}

export function parseUa(ua: string): UserAgent {
  return uaparser(ua);
}

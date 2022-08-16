import momentMini from "moment-mini";
import { BrowserBreadcrumbType, Severity } from "@/types";

export const timeFormat = (time: string): string => {
  return momentMini(time).format("YYYY-MM-DD hh:mm:ss");
};

export const mapTypeColor = (type: BrowserBreadcrumbType) => {
  switch (type) {
    case BrowserBreadcrumbType.Http:
      return "green";
    case BrowserBreadcrumbType.User:
      return "cyan";
    case BrowserBreadcrumbType.Route:
      return "blue";
    case BrowserBreadcrumbType.Debug:
      return "geekblue";
    case BrowserBreadcrumbType.Error:
      return "magenta";
    case BrowserBreadcrumbType.Custom:
      return "purple";
    default:
      break;
  }
};

export const mapLevelColor = (level: Severity) => {
  switch (level) {
    case Severity.Critical:
      return "red";
    case Severity.Error:
      return "volcano";
    case Severity.Warn:
      return "orange";
    case Severity.Info:
      return "blue";
    case Severity.Log:
      return "green";
    default:
      break;
  }
};

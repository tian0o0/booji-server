export enum Status {
  ToBeHandled,
  Handling,
  Handled,
  Closed,
  Reopened,
  Ignored,
}

export enum Severity {
  Critical = "critical",
  Error = "error",
  Warn = "warn",
  Info = "info",
  Log = "log",
}

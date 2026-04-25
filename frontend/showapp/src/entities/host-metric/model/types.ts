import type { TimeRangeOption } from "../../../features/time-range-filter";
import type { ServerScopeQuery } from "../../server";

export type HostMetricPoint = {
  timestamp: string;
  cpuUsagePercent: number;
  memoryUsagePercent: number;
  memoryUsedBytes?: number;
  memoryAvailableBytes?: number;
};

export type HostMetricSeries = {
  serverAlias: string;
  points: HostMetricPoint[];
};

export type HostMetricsResponse = {
  environment: string;
  project: string;
  from: string;
  to: string;
  step: string;
  series: HostMetricSeries[];
};

export type HostMetricsQuery = {
  serverScope: ServerScopeQuery;
  timeRange: TimeRangeOption;
};
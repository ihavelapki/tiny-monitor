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
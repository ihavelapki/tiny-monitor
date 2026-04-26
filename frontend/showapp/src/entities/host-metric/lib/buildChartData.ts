import type { HostMetricSeries } from '../model/types';

type MetricKey = 'cpuUsagePercent' | 'memoryUsagePercent';

export const buildChartData = (series: HostMetricSeries[], metricKey: MetricKey) => {
  const pointsByTimestamp = new Map<string, Record<string, string | number>>();

  series.forEach((hostSeries) => {
    hostSeries.points.forEach((point) => {
      const existingPoint = pointsByTimestamp.get(point.timestamp) ?? {
        timestamp: point.timestamp,
      };

      existingPoint[hostSeries.serverAlias] = point[metricKey];

      pointsByTimestamp.set(point.timestamp, existingPoint);
    });
  });

  return Array.from(pointsByTimestamp.values()).sort((a, b) =>
    String(a.timestamp).localeCompare(String(b.timestamp)),
  );
};
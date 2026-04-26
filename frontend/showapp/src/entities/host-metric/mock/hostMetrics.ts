import type { HostMetricSeries, HostMetricsResponse } from '../model/types';

const createPoints = (
  startDate: string,
  count: number,
  stepMinutes: number,
  baseCpu: number,
  baseMemory: number,
) => {
  return Array.from({ length: count }, (_, index) => {
    const timestamp = new Date(startDate);
    timestamp.setMinutes(timestamp.getMinutes() + index * stepMinutes);

    const cpuWave = Math.sin(index / 3) * 8;
    const memoryWave = Math.cos(index / 4) * 5;

    const cpuUsagePercent = Math.round(baseCpu + cpuWave + (index % 5));
    const memoryUsagePercent = Math.round(baseMemory + memoryWave + (index % 3));

    const totalMemoryBytes = 16 * 1024 * 1024 * 1024;
    const memoryUsedBytes = Math.round((totalMemoryBytes * memoryUsagePercent) / 100);
    const memoryAvailableBytes = totalMemoryBytes - memoryUsedBytes;

    return {
      timestamp: timestamp.toISOString(),
      cpuUsagePercent,
      memoryUsagePercent,
      memoryUsedBytes,
      memoryAvailableBytes,
    };
  });
};

const createSeries = (
  serverAlias: string,
  baseCpu: number,
  baseMemory: number,
): HostMetricSeries => {
  return {
    serverAlias,
    points: createPoints('2026-04-01T00:00:00Z', 72, 5, baseCpu, baseMemory),
  };
};

export const mockHostMetrics: HostMetricsResponse = {
  environment: 'dev',
  project: 'default',
  from: '2026-04-01T00:00:00Z',
  to: '2026-04-01T06:00:00Z',
  step: '5m',
  series: [
    createSeries('master', 25, 52),
    createSeries('worker', 55, 68),
    createSeries('database', 42, 61),
  ],
};
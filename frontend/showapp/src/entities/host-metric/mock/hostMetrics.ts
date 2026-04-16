import type { HostMetricsResponse } from '../model/types';

export const mockHostMetrics: HostMetricsResponse = {
  environment: 'dev',
  project: 'default',
  from: '2026-04-01T00:00:00Z',
  to: '2026-04-01T01:00:00Z',
  step: '5m',
  series: [
    {
      serverAlias: 'master',
      points: [
        {
          timestamp: '2026-04-01T00:00:00Z',
          cpuUsagePercent: 24,
          memoryUsagePercent: 52,
          memoryUsedBytes: 8724152320,
          memoryAvailableBytes: 8040833024,
        },
        {
          timestamp: '2026-04-01T00:05:00Z',
          cpuUsagePercent: 27,
          memoryUsagePercent: 53,
          memoryUsedBytes: 8891924480,
          memoryAvailableBytes: 7873060864,
        },
        {
          timestamp: '2026-04-01T00:10:00Z',
          cpuUsagePercent: 22,
          memoryUsagePercent: 51,
          memoryUsedBytes: 8556380160,
          memoryAvailableBytes: 8208605184,
        },
      ],
    },
    {
      serverAlias: 'worker',
      points: [
        {
          timestamp: '2026-04-01T00:00:00Z',
          cpuUsagePercent: 61,
          memoryUsagePercent: 71,
          memoryUsedBytes: 11911823360,
          memoryAvailableBytes: 4853161984,
        },
        {
          timestamp: '2026-04-01T00:05:00Z',
          cpuUsagePercent: 57,
          memoryUsagePercent: 69,
          memoryUsedBytes: 11576279040,
          memoryAvailableBytes: 5188706304,
        },
        {
          timestamp: '2026-04-01T00:10:00Z',
          cpuUsagePercent: 64,
          memoryUsagePercent: 73,
          memoryUsedBytes: 12247367680,
          memoryAvailableBytes: 4517617664,
        },
      ],
    },
    {
      serverAlias: 'database',
      points: [
        {
          timestamp: '2026-04-01T00:00:00Z',
          cpuUsagePercent: 43,
          memoryUsagePercent: 66,
          memoryUsedBytes: 11072962560,
          memoryAvailableBytes: 5692022784,
        },
        {
          timestamp: '2026-04-01T00:05:00Z',
          cpuUsagePercent: 46,
          memoryUsagePercent: 67,
          memoryUsedBytes: 11240734720,
          memoryAvailableBytes: 5524250624,
        },
        {
          timestamp: '2026-04-01T00:10:00Z',
          cpuUsagePercent: 41,
          memoryUsagePercent: 65,
          memoryUsedBytes: 10905190400,
          memoryAvailableBytes: 5859803136,
        },
      ],
    },
  ],
};
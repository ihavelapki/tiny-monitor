import { filterHostMetrics } from '../lib/filterHostMetrics';
import { mockHostMetrics } from '../mock/hostMetrics';
import type { HostMetricsQuery, HostMetricsResponse } from '../model/types';

export const getHostMetrics = async (
  query: HostMetricsQuery,
): Promise<HostMetricsResponse> => {
  return filterHostMetrics(mockHostMetrics, query);
};
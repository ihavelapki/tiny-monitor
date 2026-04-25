import type { HostMetricsQuery, HostMetricsResponse } from '../model/types';

export const filterHostMetrics = (
  data: HostMetricsResponse,
  query: HostMetricsQuery,
): HostMetricsResponse => {
  const { serverScope } = query;

  const matchesEnvironment = data.environment === serverScope.environment;
  const matchesProject = data.project === serverScope.project;

  if (!matchesEnvironment || !matchesProject) {
    return {
      ...data,
      environment: serverScope.environment,
      project: serverScope.project,
      series: [],
    };
  }

  return {
    ...data,
    series: data.series.filter((item) =>
      serverScope.selectedHosts.includes(item.serverAlias),
    ),
  };
};
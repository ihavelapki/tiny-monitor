import { useEffect, useState } from 'react';

import { getHostMetrics } from '../../../entities/host-metric';
import type { HostMetricsResponse } from '../../../entities/host-metric';
import { getServerScopeOptions, mockServerSnapshots } from '../../../entities/server';
import { MetricsFilters, useMetricsFilters } from '../../../features/metrics-filters';
import { PageHeader } from '../../../shared/ui/page-header';
import { HostMetricChart } from '../../../entities/host-metric';

export const MetricsPage = () => {
  const {
    filters,
    setEnvironment,
    setProject,
    setSelectedHosts,
    selectAllHosts,
    clearHosts,
    setTimeRange,
  } = useMetricsFilters();

  const [metrics, setMetrics] = useState<HostMetricsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { environmentOptions, projectOptions, hostOptions } = getServerScopeOptions({
    snapshots: mockServerSnapshots,
    environment: filters.scope.environment,
    project: filters.scope.project,
  });

  useEffect(() => {
    const loadMetrics = async () => {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const result = await getHostMetrics({
          serverScope: {
            environment: filters.scope.environment,
            project: filters.scope.project,
            selectedHosts: filters.scope.selectedHosts,
          },
          timeRange: filters.timeRange,
        });

        setMetrics(result);
      } catch {
        setMetrics(null);
        setErrorMessage('Failed to load host metrics.');
      } finally {
        setIsLoading(false);
      }
    };

    loadMetrics();
  }, [filters]);

  const totalSeries = metrics?.series.length ?? 0;
  const totalPoints =
    metrics?.series.reduce((acc, item) => acc + item.points.length, 0) ?? 0;

  return (
    <main className="page">
      <PageHeader
        title="Metrics"
        description="CPU and memory metrics for selected hosts in the current project."
      />

      <section className="page__section">
        <h2 className="page__section-title">Metrics scope</h2>

        <MetricsFilters
          environment={filters.scope.environment}
          project={filters.scope.project}
          selectedHosts={filters.scope.selectedHosts}
          timeRange={filters.timeRange}
          environmentOptions={environmentOptions}
          projectOptions={projectOptions}
          hostOptions={hostOptions}
          onEnvironmentChange={setEnvironment}
          onProjectChange={setProject}
          onHostsChange={setSelectedHosts}
          onSelectAllHosts={() => selectAllHosts(hostOptions)}
          onClearHosts={clearHosts}
          onTimeRangeChange={setTimeRange}
        />
      </section>

      {isLoading && <div className="empty-state">Loading metrics...</div>}

      {errorMessage && <div className="empty-state">{errorMessage}</div>}

      {!isLoading && !errorMessage && (
        <>
          <section className="page__section">
            <h2 className="page__section-title">Charts</h2>

            {!metrics || metrics.series.length === 0 ? (
              <div className="empty-state">No chart data for the current filters.</div>
            ) : (
              <div className="page__section">
                <HostMetricChart
                  title="CPU usage"
                  series={metrics.series}
                  metricKey="cpuUsagePercent"
                />

                <HostMetricChart
                  title="Memory usage"
                  series={metrics.series}
                  metricKey="memoryUsagePercent"
                />
              </div>
            )}
          </section>

                    <section className="page__section">
            <h2 className="page__section-title">Request overview</h2>

            <div className="surface-grid">
              <div className="surface-card">
                <h3>Environment</h3>
                <p>{filters.scope.environment}</p>
              </div>

              <div className="surface-card">
                <h3>Project</h3>
                <p>{filters.scope.project}</p>
              </div>

              <div className="surface-card">
                <h3>Selected hosts</h3>
                <p>
                  {filters.scope.selectedHosts.length > 0
                    ? filters.scope.selectedHosts.join(', ')
                    : 'none'}
                </p>
              </div>

              <div className="surface-card">
                <h3>Time range</h3>
                <p>{filters.timeRange}</p>
              </div>

              <div className="surface-card">
                <h3>Response from</h3>
                <p>{metrics?.from ?? 'unknown'}</p>
              </div>

              <div className="surface-card">
                <h3>Response to</h3>
                <p>{metrics?.to ?? 'unknown'}</p>
              </div>

              <div className="surface-card">
                <h3>Step</h3>
                <p>{metrics?.step ?? 'unknown'}</p>
              </div>

              <div className="surface-card">
                <h3>Total series</h3>
                <p>{totalSeries}</p>
              </div>

              <div className="surface-card">
                <h3>Total points</h3>
                <p>{totalPoints}</p>
              </div>
            </div>
          </section>
        </>
      )}
    </main>
  );
};
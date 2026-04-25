import { getServerScopeOptions, mockServerSnapshots } from '../../../entities/server';
import { mockHostMetrics } from '../../../entities/host-metric';
import { MetricsFilters, useMetricsFilters } from '../../../features/metrics-filters';
import { PageHeader } from '../../../shared/ui/page-header';

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

  const { environmentOptions, projectOptions, hostOptions } = getServerScopeOptions({
    snapshots: mockServerSnapshots,
    environment: filters.scope.environment,
    project: filters.scope.project,
  });

  const { from, to } = mockHostMetrics;

  // const selectedHosts = series.map((item) => item.serverAlias);
  // const totalSeries = series.length;
  // const totalPoints = series.reduce((acc, item) => acc + item.points.length, 0);

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

          {/* <div className="surface-card">
            <h3>Selected hosts</h3>
            <p>
              {filters.scope.selectedHosts.length > 0
                ? filters.scope.selectedHosts.join(', ')
                : 'none'}
            </p>
          </div> */}

          {/* <div className="surface-card">
            <h3>Time range</h3>
            <p>{filters.timeRange}</p>
          </div> */}

          <div className="surface-card">
            <h3>Response from</h3>
            <p>{from}</p>
          </div>

          <div className="surface-card">
            <h3>Response to</h3>
            <p>{to}</p>
          </div>

          {/* <div className="surface-card">
            <h3>Step</h3>
            <p>{step}</p>
          </div> */}

          {/* <div className="surface-card">
            <h3>Total series</h3>
            <p>{totalSeries}</p>
          </div>

          <div className="surface-card">
            <h3>Total points</h3>
            <p>{totalPoints}</p>
          </div> */}
        </div>
      </section>

      <section className="page__section">
        <h2 className="page__section-title">Chart placeholders</h2>

        <div className="page__section">
          <div className="surface-card">
            <h3>CPU usage</h3>
            <div className="empty-state">
              CPU chart will be rendered here from the selected host series.
            </div>
          </div>

          <div className="surface-card">
            <h3>Memory usage</h3>
            <div className="empty-state">
              Memory chart will be rendered here from the selected host series.
            </div>
          </div>
        </div>
      </section>

      {/* <section className="page__section">
        <h2 className="page__section-title">Metric series preview</h2>

        <div className="page__section">
          {series.map((hostSeries) => (
            <article key={hostSeries.serverAlias} className="surface-card">
              <div className="page__section">
                <div>
                  <h3>{hostSeries.serverAlias}</h3>
                  <p>Points: {hostSeries.points.length}</p>
                </div>

                <div className="surface-grid">
                  {hostSeries.points.map((point) => (
                    <div key={point.timestamp} className="surface-card surface-card--muted">
                      <h4>{point.timestamp}</h4>
                      <p>CPU usage: {point.cpuUsagePercent}%</p>
                      <p>Memory usage: {point.memoryUsagePercent}%</p>
                      <p>Memory used: {formatBytes(point.memoryUsedBytes)}</p>
                      <p>Memory available: {formatBytes(point.memoryAvailableBytes)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section> */}
    </main>
  );
};
import { mockHostMetrics } from '../../../entities/host-metric';
import { PageHeader } from '../../../shared/ui/page-header';
import { formatBytes } from '../../../shared/lib/formatBytes';
import { Button } from '../../../shared/ui/button';

export const MetricsPage = () => {
  const { environment, project, from, to, step, series } = mockHostMetrics;

  const selectedHosts = series.map((item) => item.serverAlias);
  const totalSeries = series.length;
  const totalPoints = series.reduce((acc, item) => acc + item.points.length, 0);

  return (
    <main className="page">
      <PageHeader
        title="Metrics"
        description="CPU and memory metrics for selected hosts in the current project."
        actions={
          <>
            <Button>Refresh</Button>
            <Button>Select all hosts</Button>
          </>
        }
      />

      <section className="page__section">
        <h2 className="page__section-title">Request overview</h2>

        <div className="surface-grid">
          <div className="surface-card">
            <h3>Environment</h3>
            <p>{environment}</p>
          </div>

          <div className="surface-card">
            <h3>Project</h3>
            <p>{project}</p>
          </div>

          <div className="surface-card">
            <h3>From</h3>
            <p>{from}</p>
          </div>

          <div className="surface-card">
            <h3>To</h3>
            <p>{to}</p>
          </div>

          <div className="surface-card">
            <h3>Step</h3>
            <p>{step}</p>
          </div>

          <div className="surface-card">
            <h3>Selected hosts</h3>
            <p>{selectedHosts.join(', ')}</p>
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

      <section className="page__section">
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
      </section>
    </main>
  );
};
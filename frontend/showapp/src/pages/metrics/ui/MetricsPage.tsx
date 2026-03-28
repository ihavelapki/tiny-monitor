import { PageHeader } from '../../../shared/ui/page-header';

export const MetricsPage = () => {
  return (
    <main className="page">
      <PageHeader
        title="Metrics"
        description="CPU and RAM charts for monitored servers."
      />

      <section className="page__section">
        <h2 className="page__section-title">Filters</h2>

        <div className="surface-grid">
          <div className="surface-card">Server selector</div>
          <div className="surface-card">Time range</div>
        </div>
      </section>

      <section className="page__section">
        <h2 className="page__section-title">Charts</h2>

        <div className="surface-card">
          <h3>CPU usage</h3>
          <div className="empty-state">Chart placeholder</div>
        </div>

        <div className="surface-card">
          <h3>RAM usage</h3>
          <div className="empty-state">Chart placeholder</div>
        </div>
      </section>
    </main>
  );
};
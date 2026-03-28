export const MetricsPage = () => {
  return (
    <main className="page">
      <div className="page__header">
        <h1 className="page__title">Metrics</h1>
        <p className="page__description">
          This page will display CPU and RAM charts for monitored servers and allow filtering by
          server and time range.
        </p>
      </div>

      <section className="page__section">
        <h2 className="page__section-title">Filters</h2>

        <div className="surface-grid">
          <div className="surface-card">
            <h3>Server selector</h3>
            <p>Here we will add a control for choosing a specific server.</p>
          </div>

          <div className="surface-card">
            <h3>Time range</h3>
            <p>Here we will add a control for selecting the period of displayed metrics.</p>
          </div>
        </div>
      </section>

      <section className="page__section">
        <h2 className="page__section-title">Charts</h2>

        <div className="surface-card">
          <h3>CPU usage</h3>
          <div className="empty-state">
            CPU chart will be placed here after we connect chart components.
          </div>
        </div>

        <div className="surface-card">
          <h3>RAM usage</h3>
          <div className="empty-state">
            RAM chart will be placed here after we connect chart components.
          </div>
        </div>
      </section>
    </main>
  );
};
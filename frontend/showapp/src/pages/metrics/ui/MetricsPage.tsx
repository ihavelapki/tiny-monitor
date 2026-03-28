export const MetricsPage = () => {
  return (
    <main className="page">
      <div className="page__header">
        <h1 className="page__title">Metrics</h1>
        <p className="page__description">CPU and RAM usage for monitored servers.</p>
      </div>

      <section className="page__section">
        <div className="surface-card">Filters</div>
        <div className="surface-card">Charts</div>
      </section>
    </main>
  );
};